import { Article } from "_types/Article";
import { spacing } from "_utils/viewport";
import { Link } from "expo-router";
import { View } from "react-native";
import FeedItem from "./FeedItem";
import analytics from '_utils/analytics/segment';

export function FeedLink({ item }: {
  item: Article;
  analytics?: typeof analytics
}) {
  return <View className='w-full'>
    <View className='h-[150px] w-full'>
      <Link
        className='w-full'
        onPress={() => {
          analytics?.trackEvent('Feed Item Pressed', {
            feedId: item.id,
          });
        }}
        href={{
          pathname: '/feed/[id]',
          params: {
            id: item.id,
            title: item.title,
            author: item.author,
            datePublished: item.datePublished,
            content: item.content,
            imgSrc: item.imgSrc,
          },
        }}
      >
        <FeedItem item={item} />
      </Link>
    </View>
    <View className='bg-white' style={{ height: spacing }} />
  </View>;
}

