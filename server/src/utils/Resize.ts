import sharp from 'sharp';
import { PUBLIC_PATH } from '../config/constants';

export class Resize {
    imagePath: string;

    constructor(imagePath: string) {
        this.imagePath = imagePath;
    }

    async save(buffer: any) {
        await sharp(buffer)
            .resize(300, 300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toFile(this.creteSavePath());

        return this.imagePath;
    }

    private creteSavePath() {
        return `${PUBLIC_PATH}${this.imagePath}`;
    }
}
