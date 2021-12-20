package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"

	"github.com/gnyiri/web_image_poc/config"
	"github.com/gnyiri/web_image_poc/image_repository"
)

type ImageHandler struct {
	cf *config.Config
	ir *image_repository.ImageRepository
}

func NewImageHandler(c *config.Config, i *image_repository.ImageRepository) *ImageHandler {
	return &ImageHandler{cf: c, ir: i}
}

func (i *ImageHandler) ImagesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var response ImageDTO

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

	tempFile, err := ioutil.TempFile(path.Join(i.cf.WWWRoot, i.cf.ImageRepositoryPath), "upload-*.png")
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer tempFile.Close()

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}

	tempFile.Write(fileBytes)

	err = os.Chmod(tempFile.Name(), 0755)
	if err != nil {
		log.Fatal(err)
	}

	w.WriteHeader(http.StatusOK)
}
