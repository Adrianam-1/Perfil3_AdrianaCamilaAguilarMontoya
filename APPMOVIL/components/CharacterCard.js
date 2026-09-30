import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

// La API devuelve el estado en inglés; aquí se traduce y se le asigna un color.
const STATUS = {
  Alive: { label: 'Vivo', color: COLORS.success },
  Dead: { label: 'Muerto', color: COLORS.danger },
  unknown: { label: 'Desconocido', color: COLORS.neutral },
};

// Tarjeta reutilizable que muestra un personaje de la API.
function CharacterCard({ character }) {
  const status = STATUS[character.status] ?? STATUS.unknown;

  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>

        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: status.color }]} />
          <Text style={styles.status} numberOfLines={1}>
            {status.label} · {character.species}
          </Text>
        </View>

        <Text style={styles.detailLabel}>Origen</Text>
        <Text style={styles.detail} numberOfLines={1}>
          {character.origin?.name ?? 'Sin información'}
        </Text>
      </View>
    </View>
  );
}

export default memo(CharacterCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  image: {
    width: 104,
    height: 104,
    backgroundColor: COLORS.border,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  name: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  status: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
  },
  detailLabel: {
    marginTop: SPACING.sm,
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  detail: {
    color: COLORS.text,
    fontSize: 14,
  },
});
