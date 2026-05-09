import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { categories } from '../constant/categories';

export default function CategoryFilter({
  selected,
  onSelect,
}: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      <TouchableOpacity
        style={[
          styles.item,
          selected === 'All' && styles.active,
        ]}
        onPress={() => onSelect('All')}
      >
        <Text>All</Text>
      </TouchableOpacity>

      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.item,
            selected === cat && styles.active,
          ]}
          onPress={() => onSelect(cat)}
        >
          <Text>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  scroll: {
    marginBottom: 18,
  },
  active: {
    backgroundColor: '#C8E6C9',
  },
});