package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gnyiri/web_image_poc/api"
	"github.com/gnyiri/web_image_poc/config"
	"github.com/gnyiri/web_image_poc/image_repository"
	"github.com/gorilla/mux"
)

func main() {
	cf := config.NewConfig(8080, "/var/www/html", "repository")
	ir := image_repository.NewImageRepository(cf)
	ih := api.NewImageHandler(cf, ir)

	log.Printf("Configuration: %s", cf)

	r := mux.NewRouter()
	r.HandleFunc("/upload", ih.ImageUploadHandler)
	r.HandleFunc("/images", ih.ImagesHandler)
	r.Use(mux.CORSMethodMiddleware(r))

	http.ListenAndServe(fmt.Sprintf(":%d", cf.ServerPort), r)
}
