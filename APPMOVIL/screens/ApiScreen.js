import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CharacterCard from '../components/CharacterCard';
import PrimaryButton from '../components/PrimaryButton';
import StatusMessage from '../components/StatusMessage';
import { COLORS, SPACING } from '../constants/theme';
import useCharacters from '../hooks/useCharacters';

// Pantalla 2: lista de personajes obtenidos desde la API.
// Toda la lógica de la petición vive en el Custom Hook useCharacters.
export default function ApiScreen({ navigation }) {
  const { characters, loading, refreshing, error, retry, refresh } = useCharacters();

  const renderContent = () => {
    if (loading) {
      return <StatusMessage loading title="Cargando personajes" message="Consultando la API..." />;
    }

    if (error) {
      return (
        <StatusMessage
          title="Ocurrió un problema"
          message={error}
          actionLabel="Reintentar"
          onAction={retry}
        />
      );
    }

    return (
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CharacterCard character={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={
          characters.length > 0 ? (
            <Text style={styles.counter}>{characters.length} personajes encontrados</Text>
          ) : null
        }
        ListEmptyComponent={
          <StatusMessage
            title="Sin resultados"
            message="La API no devolvió personajes para mostrar."
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[COLORS.accent]}
            tintColor={COLORS.accent}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.content}>{renderContent()}</View>

      <View style={styles.bottomBar}>
        <PrimaryButton
          title="Regresar al perfil"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    padding: SPACING.md,
  },
  counter: {
    marginBottom: SPACING.md,
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    height: SPACING.md,
  },
  bottomBar: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
