package api

import (
	"github.com/gnyiri/web_image_poc/image_repository"
)

type ImageDTO struct {
	Images []image_repository.ImageEntity `json:"images"`
}
