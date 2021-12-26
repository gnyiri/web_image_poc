package image_repository

type HistogramEntity struct {
	Min    uint32   `json:"min"`
	Max    uint32   `json:"max"`
	Values []uint32 `json:"values"`
}
