import RNFS from 'react-native-fs';
import { Parser } from 'json2csv';
import { Alert } from 'react-native';

export const exportCSV = async (
  expenses: any[],
) => {
  try {
    const parser = new Parser();
    const csv = parser.parse(expenses);

    const path =
      RNFS.DownloadDirectoryPath +
      '/expenses.csv';

    await RNFS.writeFile(path, csv, 'utf8');

    Alert.alert(
      'Success',
      `CSV exported to:\n${path}`,
    );
  } catch (error) {
    console.log('CSV export error:', error);
    Alert.alert('Error', 'Failed to export CSV');
  }
};
