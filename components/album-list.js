import React, {Component} from 'react';
import {FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, View} from 'react-native';
import {AlbumItem} from './album-item';
import AlbumDetail from './album-detail';
import { connect } from 'react-redux';

import { loadAlbums, selectAlbum, unSelectAlbum } from '../store/actions/albums';

class AlbumList extends Component {

  componentDidMount() {
    this.props.loadAlbums();
  }

  render() {
    return !this.props.selectedAlbum ? (
      this.props.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={this.props.data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.selectItem(item)}>
              <AlbumItem album={item}></AlbumItem>
            </TouchableOpacity>
          )}></FlatList>
      )
    ) : (
      <AlbumDetail
        backAction={() => this.goBack()}
        album={this.props.selectedAlbum}></AlbumDetail>
    );
  }

  selectItem(item) {
    this.props.selectAlbum(item);
  }

  goBack() {
    this.props.unSelectAlbum();
  }
}

const mapStateToProps = state => {
        return {
          data: state.albums.albums,
          loading: state.albums.loading,
          selectedAlbum: state.albums.selectedAlbum
        };
      };

  const mapDispatchToProps = {
    loadAlbums,
    selectAlbum,
    unSelectAlbum
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);