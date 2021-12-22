export interface Image {
    name: string;
    path: string;
    creation_time: number;
    full_path: string;
}

export interface SingleImageResponse {
    image: Image;
}

export interface MultiImageResponse {
    images: Image[];
}
