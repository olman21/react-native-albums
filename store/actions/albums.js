import axios from 'axios';

export const LOAD_ALBUMS = "LOAD_ALBUMS";
export const LOAD_ALBUMS_SUCCESS = "LOAD_ALBUMS_SUCCESS";

export const SELECT_ALBUM = "SELECT_ALBUM";
export const UNSELECT_ALBUM = "UNSELECT_ALBUM";

export const loadAlbums = () => {

    return async (dispatch) => {
        dispatch({ type: LOAD_ALBUMS })

        const albums = await axios.get(
            'https://jsonplaceholder.typicode.com/albums/',
          );
          const photos = await axios.get(
            'https://jsonplaceholder.typicode.com/photos/',
          );


          dispatch(loadAlbumsSuccess({ albums: albums.data, photos: photos.data }))
    }
};

export const loadAlbumsSuccess = ({ albums, photos }) => {
    return {
        type: LOAD_ALBUMS_SUCCESS,
        payload: {
            albums,
            photos
        }
    }
};

export const selectAlbum = (album) => {
    return {
        type: SELECT_ALBUM,
        payload: album
    }
}

export const unSelectAlbum = (album) => {
    return {
        type: UNSELECT_ALBUM
    }
}