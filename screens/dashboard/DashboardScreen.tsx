import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Company {
  id: number;
  name: string;
  position: string;
  location: string;
  distance: string;
  isBookmarked: boolean;
  logo: string;
}

interface DashboardScreenProps {
  navigation: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const companies: Company[] = [
    {
      id: 1,
      name: 'MTN Cameroon',
      position: 'Stage Ingénieur Logiciel',
      location: 'Yaoundé',
      distance: '1.2',
      isBookmarked: true,
      logo: '📱',
    },
    {
      id: 2,
      name: 'Orange Cameroun',
      position: 'Stage Marketing Digital',
      location: 'Douala',
      distance: '2.5',
      isBookmarked: false,
      logo: '🍊',
    },
    {
      id: 3,
      name: 'Afriland First Bank',
      position: 'Stage Analyste Financier',
      location: 'Yaoundé',
      distance: '0.8',
      isBookmarked: true,
      logo: '🏦',
    },
    {
      id: 4,
      name: 'CAMTEL',
      position: 'Stage Télécommunications',
      location: 'Buea',
      distance: '15.2',
      isBookmarked: false,
      logo: '📡',
    },
    {
      id: 5,
      name: 'Total Energies',
      position: 'Stage Ingénieur Pétrole',
      location: 'Douala',
      distance: '3.1',
      isBookmarked: true,
      logo: '⛽',
    },
    {
      id: 6,
      name: 'Ecobank Cameroun',
      position: 'Stage IT Support',
      location: 'Bamenda',
      distance: '45.8',
      isBookmarked: false,
      logo: '💳',
    },
  ];

  const categories = ['Tous', 'Télécoms', 'Banque', 'Pétrole', 'Agriculture', 'Tech'];

  const toggleBookmark = (companyId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggled bookmark for company ${companyId}`);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         company.position.toLowerCase().includes(searchText.toLowerCase());
    
    if (selectedCategory === 'Tous') return matchesSearch;
    
    // Simple category filtering
    const categoryMap: { [key: string]: string[] } = {
      'Télécoms': ['MTN Cameroon', 'Orange Cameroun', 'CAMTEL'],
      'Banque': ['Afriland First Bank', 'Ecobank Cameroun'],
      'Pétrole': ['Total Energies'],
      'Tech': ['MTN Cameroon', 'Orange Cameroun'],
    };
    
    return matchesSearch && categoryMap[selectedCategory]?.includes(company.name);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour! 👋</Text>
            <Text style={styles.subtitle}>Trouvez votre stage idéal</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>JM</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher entreprises ou postes..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{filteredCompanies.length}</Text>
            <Text style={styles.statLabel}>Opportunités</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{companies.filter(c => c.isBookmarked).length}</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Candidatures</Text>
          </View>
        </View>

        {/* Companies List */}
        <View style={styles.companiesSection}>
          <Text style={styles.sectionTitle}>Opportunités près de vous</Text>
          
          {filteredCompanies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={styles.companyCard}
              onPress={() => navigation.navigate('CompanyDetail', { company })}
            >
              <View style={styles.companyHeader}>
                <View style={styles.companyLogo}>
                  <Text style={styles.companyLogoText}>{company.logo}</Text>
                </View>
                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.companyPosition}>{company.position}</Text>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text style={styles.locationText}>
                      {company.distance} km • {company.location}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.bookmarkButton}
                  onPress={() => toggleBookmark(company.id)}
                >
                  <Ionicons
                    name={company.isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={company.isBookmarked ? "#8B5CF6" : "#6B7280"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Load More Button */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Voir plus d'opportunités</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  companiesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  companyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyLogoText: {
    fontSize: 20,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  companyPosition: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  bookmarkButton: {
    padding: 8,
  },
  loadMoreButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  loadMoreText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;