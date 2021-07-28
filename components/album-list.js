import React, {Component} from 'react';
import {FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, View} from 'react-native';
import {AlbumItem} from './album-item';
import AlbumDetail from './album-detail';
import axios from 'axios';

export class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selectedAlbum: null,
      loading: false,
    };
  }

  async componentDidMount() {

    this.setState({
      loading: true,
    });

    const albums = await axios.get(
      'https://jsonplaceholder.typicode.com/albums/',
    );
    const photos = await axios.get(
      'https://jsonplaceholder.typicode.com/photos/',
    );

    const albumHashTable = albums.data.reduce((item, current) => {
      item[current.id] = current;
      return item;
    }, {});

    const albumWithPhotos = photos.data.reduce((item, current) => {
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

    this.setState({
      data: albumWithPhotos,
    });


    this.setState({
      loading: false,
    });
  }

  render() {
    return !this.state.selectedAlbum ? (
      this.state.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={Object.keys(this.state.data).map(k => this.state.data[k])}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.selectItem(item)}>
              <AlbumItem album={item}></AlbumItem>
            </TouchableOpacity>
          )}></FlatList>
      )
    ) : (
      <AlbumDetail
        backAction={() => this.goBack()}
        album={this.state.selectedAlbum}></AlbumDetail>
    );
  }

  selectItem(item) {
    this.setState({
      selectedAlbum: item,
    });
  }

  goBack() {
    console.log(this.state.selectedAlbum);
    this.setState({
      selectedAlbum: null,
    });

    console.log(this.state.selectedAlbum);
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
