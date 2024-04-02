import { useState } from 'react';
import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  FlatList,
} from 'react-native';
import { viewportWidth, spacing } from '@lib/viewport';

type CarouselProps<T extends Array<unknown>> = {
  data: T;
  renderItem: ListRenderItem<T[number]>;
  showPagination?: boolean;
  className?: string;
};

export const Carousel = <T extends Array<unknown>>({
  data,
  renderItem,
  showPagination = true,
  className,
}: CarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const itemSize = Math.floor(viewportWidth * 0.8);
  const fullItemSize = itemSize + spacing;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offset / fullItemSize);
    setActiveIndex(index);
  };

  const RenderItem = renderItem;

  return (
    <>
      <FlatList
        className={className}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={(renderItemProps) => <RenderItem {...renderItemProps} />}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
      />
      {showPagination && (
        <View className="flex-row justify-center">
          {data.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: activeIndex === index ? '#3a3a3a' : '#ccc',
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      )}
    </>
  );
};
