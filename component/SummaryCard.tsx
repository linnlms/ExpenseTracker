import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  value: string | number;
  color?: string;
}

export default function SummaryCard({ title, value, color }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: color || '#4a90e2' }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
  title: {
    fontSize: 14,
    color: '#777',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 5,
  },
});