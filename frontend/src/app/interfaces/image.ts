export interface Image {
    name: string;
    path: string;
    creation_time: number;
    full_path: string;
}

export interface ImageMessage {
    images: Image[];
}
