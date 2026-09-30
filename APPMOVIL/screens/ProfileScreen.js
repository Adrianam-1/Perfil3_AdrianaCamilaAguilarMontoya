import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoRow from '../components/InfoRow';
import PrimaryButton from '../components/PrimaryButton';
import { STUDENT } from '../constants/student';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

// Toma la inicial del primer nombre y la del primer apellido.
function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const lastNameIndex = parts.length > 2 ? parts.length - 2 : parts.length - 1;
  return `${parts[0][0]}${parts[lastNameIndex][0]}`.toUpperCase();
}

// Pantalla 1: perfil del estudiante.
export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(STUDENT.name)}</Text>
          </View>
          <Text style={styles.caption}>Perfil del estudiante</Text>
          <Text style={styles.name}>{STUDENT.name}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.card}>
            <InfoRow label="Carnet" value={STUDENT.carnet} />
            <InfoRow label="Sección" value={STUDENT.section} />
            <InfoRow label="Grupo" value={STUDENT.group} isLast />
          </View>

          <View style={styles.footer}>
            <PrimaryButton
              title="Ver personajes de la API"
              onPress={() => navigation.navigate('Api')}
            />
            <Text style={styles.hint}>Datos obtenidos de The Rick and Morty API</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl + SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    marginBottom: SPACING.md,
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: '800',
  },
  caption: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  name: {
    marginTop: SPACING.sm,
    color: COLORS.textOnPrimary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 31,
  },
  body: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  card: {
    // La tarjeta se superpone al encabezado para dar profundidad.
    marginTop: -SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: SPACING.xl,
  },
  hint: {
    marginTop: SPACING.md,
    color: COLORS.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
});
