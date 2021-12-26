package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gnyiri/web_image_poc/api"
	"github.com/gnyiri/web_image_poc/config"
	"github.com/gnyiri/web_image_poc/image_repository"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	cf := config.NewConfig(8080, "/var/www/html", "repository")
	ir := image_repository.NewImageRepository(cf)
	ih := api.NewImageHandler(cf, ir)

	log.Printf("Configuration: %s", cf)

	r := mux.NewRouter()
	r.HandleFunc("/upload", ih.ImageUploadHandler)
	r.HandleFunc("/images", ih.ImagesHandler).Methods("GET")
	r.HandleFunc("/threshold/{image}/{threshold}", ih.ImageThresholdHandler).Methods("GET")
	r.HandleFunc("/histogram/{image}", ih.ImageHistogramHandler).Methods("GET")
	r.HandleFunc("/images/{image}", ih.ImageDeleteHandler).Methods("DELETE")
	// r.Use(mux.CORSMethodMiddleware(r))

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	})

	handler := c.Handler(r)

	http.ListenAndServe(fmt.Sprintf(":%d", cf.ServerPort), handler)
}
