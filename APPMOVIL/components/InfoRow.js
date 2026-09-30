import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

// Fila "etiqueta / valor" usada en la tarjeta de datos del estudiante.
export default function InfoRow({ label, value, isLast = false }) {
  return (
    <View style={[styles.row, !isLast && styles.divider]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
});
