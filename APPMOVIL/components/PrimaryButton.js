import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

// Botón reutilizable. La variante "outline" se usa para acciones secundarias.
export default function PrimaryButton({ title, onPress, variant = 'solid' }) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        isOutline ? styles.outline : styles.solid,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, isOutline && styles.outlineLabel]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: COLORS.accent,
  },
  outline: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  outlineLabel: {
    color: COLORS.accentDark,
  },
});
