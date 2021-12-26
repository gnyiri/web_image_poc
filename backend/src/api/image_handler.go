package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"path"
	"strconv"

	"github.com/gnyiri/web_image_poc/algorithms"
	"github.com/gnyiri/web_image_poc/config"
	"github.com/gnyiri/web_image_poc/image_io"
	"github.com/gnyiri/web_image_poc/image_repository"
	"github.com/gorilla/mux"
)

type ImageHandler struct {
	cf *config.Config
	ir *image_repository.ImageRepository
}

func NewImageHandler(c *config.Config, i *image_repository.ImageRepository) *ImageHandler {
	return &ImageHandler{cf: c, ir: i}
}

func (i *ImageHandler) ImagesHandler(w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Access-Control-Allow-Origin", "*")

	var response ImagesDTO

	images, err := i.ir.GetImages()

	if err != nil {
		log.Fatal(err)
	}

	response.Images = images

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		return
	}

	w.Write(jsonResponse)
}

func (i *ImageHandler) ImageUploadHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	r.ParseMultipartForm(10 << 20)

	file, handler, err := r.FormFile("img")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	defer file.Close()

	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}

	err = ioutil.WriteFile(path.Join(i.cf.WWWRoot, i.cf.ImageRepositoryPath, handler.Filename), fileBytes, 0755)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (i *ImageHandler) ImageDeleteHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Anyad")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	vars := mux.Vars(r)
	imageName := vars["image"]

	fmt.Printf("Delete image %s", imageName)

	err := i.ir.DeleteImage(path.Join(i.cf.WWWRoot, i.cf.ImageRepositoryPath, imageName))

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (i *ImageHandler) ImageThresholdHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)
	imageName := vars["image"]
	thresholdValue := vars["threshold"]
	//var threshold algorithms.Threshold {}
	fmt.Printf("ImageThresholdHandler: %s, threshold: %s", imageName, thresholdValue)

	thresholdValueI, err := strconv.Atoi(thresholdValue)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var response ImageDTO

	imageData, err := image_io.LoadRGBAImage(path.Join(i.cf.WWWRoot, i.cf.ImageRepositoryPath, imageName))

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	threshold := algorithms.Threshold{imageData, int(thresholdValueI)}

	outputImageData := threshold.Execute()
	outputImageName := i.ir.GenerateImageName() + ".png"
	outputImagePath := path.Join(path.Join(i.cf.WWWRoot, i.cf.ImageRepositoryPath, outputImageName))

	err = image_io.SaveGrayImage(outputImagePath, outputImageData)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	response.Image.Name = outputImageName
	response.Image.Path = outputImagePath

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Write(jsonResponse)
}

func (i *ImageHandler) ImageHistogramHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)
	imageName := vars["image"]
	//var threshold algorithms.Threshold {}
	fmt.Printf("ImageHistogramHandler: %s", imageName)

	var response HistogramDTO

	imageData, err := image_io.LoadRGBAImage(path.Join(i.cf.WWWRoot, i.cf.ImageRepositoryPath, imageName))

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	histogram := algorithms.Histogram{imageData}
	min, max, values := histogram.Execute()

	response.Histogram.Min = min
	response.Histogram.Max = max
	response.Histogram.Values = values[:]

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Write(jsonResponse)
}
