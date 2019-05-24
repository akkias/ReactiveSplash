import {unsplash} from './Utils'
import { toJson } from "unsplash-js";

export const fetchCollections = () => {
    unsplash.collections.listCollections(1, 15, "latest")
    .then(toJson)
    .then(json => {
        this.setState ({
            collections: json,
            isLoading: false
        })
    });
}
export const fetchCollection = (id) => {
    unsplash.collections.getCollection(id)
    .then(toJson)
    .then(json => {
        this.setState ({
            collectionDetails: json
        });
    })
}
export const fetchCollectionPhotos = (id) => {
    unsplash.collections.getCollectionPhotos(id, 1, 12, 'latest')
    .then(toJson)
    .then(json => {
        this.setState ({
            images: json,
            isLoading: false
        })
    });
}
export const fetchRelatedCollections = (id) => {
    unsplash.collections.listRelatedCollections(id, 20)
    .then(toJson)
    .then(json => {
        this.setState ({
            relatedCollections: json
        })
    });
}