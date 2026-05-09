import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ExpenseItem({
  item,
  onDelete,
}: any) {
  return (
    <View style={styles.card}>
     <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amount}>
          RM {Number(item.amount).toFixed(2)}
        </Text>

        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Ionicons
            name="trash-outline"
            size={22}
            color="#D32F2F"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    marginTop: 4,
    color: '#2E7D32',
    fontWeight: '500',
  },
  date: {
    marginTop: 4,
    color: '#777',
    fontSize: 13,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});