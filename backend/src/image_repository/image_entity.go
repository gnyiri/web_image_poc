package image_repository

type ImageEntity struct {
	Name         string `json:"name"`
	Path         string `json:"path"`
	CreationTime int    `json:"creation_time"`
}
