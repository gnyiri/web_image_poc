export interface Histogram {
    min: number;
    max: number;
    values: [];
}

export interface HistogramResponse {
    histogram: Histogram;
}