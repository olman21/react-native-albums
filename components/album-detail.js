import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import styled, {css} from '@emotion/native';
import Carousel from 'react-native-snap-carousel'; 
import SliderEntry from './slider-entry';
import styles, { colors } from './styles/index.style';
import { sliderWidth, itemWidth } from './styles/slider-entry.style';

/*
 {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    } 

*/

export default AlbumDetail = ({backAction, album}) => {

    const  _renderItemWithParallax = ({item, index}, parallaxProps) => {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

  return (
    <>
      <MainContainer>
        <ContentContainer>
          <Title>{album.title}</Title>
         {album.photos && <Carousel data={album.photos.map(p=>({
              title: p.title,
              illustration: p.url
          }))}
          layout={'default'}
          renderItem={_renderItemWithParallax}
          sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
          hasParallaxImages={true}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
          ></Carousel>} 

        </ContentContainer>

        <BackButton onPress={backAction} title="Back" />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const BackdropImage = styled.Image`
    width: 100%;
    height: 200px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
`;

const BackButton = styled.Button`
    height: 45px;
    width: 100%;
`;

const ContentContainer = styled.View`
    flex-grow: 2;
`;