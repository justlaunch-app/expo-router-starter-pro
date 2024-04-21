import { FlatList } from 'react-native';
import { Article } from '@srcTypes/Article';
import { FeedLink } from '@components/ui/feed/feed-link';

import feedData from '@assets/data/feed.json';
import { SafeAreaView } from '@components/core/safe-area-view';

export default function Feed() {
  return (
    <SafeAreaView>
      <FlatList
        data={feedData}
        renderItem={({ item }: { item: Article }) => <FeedLink item={item} />}
      />
    </SafeAreaView>
  );
}
