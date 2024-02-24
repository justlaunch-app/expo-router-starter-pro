import { FlatList } from 'react-native';
import { Article } from '@srcTypes/Article';
import { FeedLink } from '@components/Feed/FeedLink';

import feedData from '@assets/data/feed.json';
import SafeAreaView from '@components/SafeAreaView/SafeAreaView';

interface RenderItemProps {
  item: Article;
}
export default function Feed() {
  return (
    <SafeAreaView>
      <FlatList
        data={feedData}
        renderItem={({ item }: RenderItemProps) => <FeedLink item={item} />}
      />
    </SafeAreaView>
  );
}
