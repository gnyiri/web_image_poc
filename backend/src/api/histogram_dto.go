package api

import "github.com/gnyiri/web_image_poc/image_repository"

type HistogramDTO struct {
	Histogram image_repository.HistogramEntity `json:"histogram"`
}
