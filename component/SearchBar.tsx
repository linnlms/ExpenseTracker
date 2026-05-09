import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

export default function SearchBar({
  value,
  onChange,
}: any) {
  return (
    <TextInput
      placeholder="Search expenses..."
      value={value}
      onChangeText={onChange}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
});