/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {ActivityIndicator} from 'react-native';
import fetch from './net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Content = styled.ScrollView`
  flex: 1;
`;
const Row = styled.View`
  flex-direction: row;
  padding: 0 12px;
  margin-bottom: 12px;
`;
const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  padding: 8px;
`;
const Button = styled.Button``;
const ListItem = styled.TouchableOpacity`
  padding: 6px 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  ${
    '' /* flex-direction: row;
  justify-content: space-between; */
  }
`;
const Label = styled.Text`
  font-size: 16px;
`;
const App: () => Node = () => {
  const [keyword, setKeyword] = useState('');
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(() => {
    setIsLoading(true);
    let url = `https://api.manana.kr/karaoke/singer/${keyword}/kumyoung.json`;
    fetch(url).then(response => {
      setSongList(response.data);
      setIsLoading(false);
    });
  }, [keyword]);
  return (
    <Container>
      <Row>
        <Input
          autoCorrect={false}
          onChangeText={text => setKeyword(text)}
          value={keyword}
        />
        <Button title="Search" onPress={search} />
      </Row>
      <Content>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          songList.map(song => {
            return (
              <ListItem key={song.no}>
                <Label>
                  {song.brand} / [{song.no}] {song.title}
                </Label>
              </ListItem>
            );
          })
        )}
      </Content>
    </Container>
  );
};

export default App;
