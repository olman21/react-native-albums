import { LOAD_ALBUMS, LOAD_ALBUMS_SUCCESS, SELECT_ALBUM, UNSELECT_ALBUM } from "../actions/albums";

const initialState = {
    albums: [],
    loading: false,
    selectedAlbum: null
}

const albumsReducer = (state = initialState, { type, payload }) =>{
    switch(type){
        case LOAD_ALBUMS:{
            return {
                ...state,
                loading: true
            }
        }
        case LOAD_ALBUMS_SUCCESS:{

            const albumHashTable = payload.albums.reduce((item, current) => {
                item[current.id] = current;
                return item;
              }, {});
          
              const albumWithPhotos = payload.photos.reduce((item, current) => {
                const album = item[current.albumId];
                if (album) {
                  if (!album.thumbnailUrl) {
                    album.thumbnailUrl = current.thumbnailUrl;
                  }
          
                  const photos = item[current.albumId].photos || [];
                  item[current.albumId].photos = [...photos, current];
                }
                return item;
              }, albumHashTable);


              return {
                  ...state,
                  albums: Object.keys(albumWithPhotos).map(k=>albumWithPhotos[k]),
                  loading: false
              }
        }
        case SELECT_ALBUM: {
            console.log("payload",payload);
            return {
                ...state,
                selectedAlbum: payload
            }
        }

        case UNSELECT_ALBUM: {
            return {
                ...state,
                selectedAlbum: null
            }
        }
    }
    return state;
}; 

export default albumsReducer;