"use client"

import { useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Switch } from "react-native"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Dashboard Screen
const DashboardScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const companies = [
    {
      id: 1,
      name: "MTN Cameroon",
      position: "Software Engineering Intern",
      location: "Yaoundé",
      distance: "1.2",
      isBookmarked: true,
      logo: "📱",
      field: "Telecom",
    },
    {
      id: 2,
      name: "Orange Cameroun",
      position: "Digital Marketing Intern",
      location: "Douala",
      distance: "2.5",
      isBookmarked: false,
      logo: "🍊",
      field: "Telecom",
    },
    {
      id: 3,
      name: "Afriland First Bank",
      position: "Financial Analyst Intern",
      location: "Yaoundé",
      distance: "0.8",
      isBookmarked: true,
      logo: "🏦",
      field: "Banking",
    },
    {
      id: 4,
      name: "CAMTEL",
      position: "Telecommunications Intern",
      location: "Buea",
      distance: "15.2",
      isBookmarked: false,
      logo: "📡",
      field: "Telecom",
    },
    {
      id: 5,
      name: "Total Energies",
      position: "Petroleum Engineering Intern",
      location: "Douala",
      distance: "3.8",
      isBookmarked: true,
      logo: "⛽",
      field: "Oil & Gas",
    },
    {
      id: 6,
      name: "Ecobank Cameroun",
      position: "IT Support Intern",
      location: "Yaoundé",
      distance: "2.1",
      isBookmarked: false,
      logo: "🏛️",
      field: "Banking",
    },
  ]

  const categories = ["All", "Telecom", "Banking", "Oil & Gas", "Tech"]

  const filteredCompanies = companies.filter((company) => {
    const matchesCategory = selectedCategory === "All" || company.field === selectedCategory
    const matchesSearch =
      company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      company.position.toLowerCase().includes(searchText.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <SafeAreaView style={dashboardStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={dashboardStyles.header}>
          <View>
            <Text style={dashboardStyles.greeting}>Hello! 👋</Text>
            <Text style={dashboardStyles.subtitle}>Find your perfect internship</Text>
          </View>
          <TouchableOpacity style={dashboardStyles.profileButton}>
            <Text style={dashboardStyles.profileText}>JM</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={dashboardStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={dashboardStyles.searchIcon} />
          <TextInput
            style={dashboardStyles.searchInput}
            placeholder="Search companies..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={dashboardStyles.categoriesContainer}
          contentContainerStyle={dashboardStyles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                dashboardStyles.categoryButton,
                selectedCategory === category && dashboardStyles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  dashboardStyles.categoryText,
                  selectedCategory === category && dashboardStyles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats */}
        <View style={dashboardStyles.statsContainer}>
          <View style={dashboardStyles.statCard}>
            <Text style={dashboardStyles.statNumber}>{filteredCompanies.length}</Text>
            <Text style={dashboardStyles.statLabel}>Opportunities</Text>
          </View>
          <View style={dashboardStyles.statCard}>
            <Text style={dashboardStyles.statNumber}>{companies.filter((c) => c.isBookmarked).length}</Text>
            <Text style={dashboardStyles.statLabel}>Bookmarked</Text>
          </View>
          <View style={dashboardStyles.statCard}>
            <Text style={dashboardStyles.statNumber}>2</Text>
            <Text style={dashboardStyles.statLabel}>Applications</Text>
          </View>
        </View>

        {/* Companies List */}
        <View style={dashboardStyles.companiesSection}>
          <Text style={dashboardStyles.sectionTitle}>
            {selectedCategory === "All" ? "Opportunities near you" : `${selectedCategory} Opportunities`}
          </Text>

          {filteredCompanies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={dashboardStyles.companyCard}
              onPress={() => navigation.navigate("CompanyDetail", { company })}
            >
              <View style={dashboardStyles.companyHeader}>
                <View style={dashboardStyles.companyLogo}>
                  <Text style={dashboardStyles.companyLogoText}>{company.logo}</Text>
                </View>
                <View style={dashboardStyles.companyInfo}>
                  <Text style={dashboardStyles.companyName}>{company.name}</Text>
                  <Text style={dashboardStyles.companyPosition}>{company.position}</Text>
                  <View style={dashboardStyles.locationContainer}>
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text style={dashboardStyles.locationText}>
                      {company.distance} km • {company.location}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={dashboardStyles.bookmarkButton}>
                  <Ionicons
                    name={company.isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={company.isBookmarked ? "#8B5CF6" : "#6B7280"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {filteredCompanies.length === 0 && (
            <View style={dashboardStyles.emptyState}>
              <Text style={dashboardStyles.emptyStateText}>No opportunities found</Text>
              <Text style={dashboardStyles.emptyStateSubtext}>Try adjusting your search criteria</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Company Detail Screen
const CompanyDetailScreen = ({ route, navigation }: any) => {
  const { company } = route.params

  return (
    <SafeAreaView style={detailStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={detailStyles.header}>
          <View style={detailStyles.companyLogoLarge}>
            <Text style={detailStyles.companyLogoTextLarge}>{company.logo}</Text>
          </View>
          <Text style={detailStyles.companyName}>{company.name}</Text>
          <Text style={detailStyles.companyLocation}>{company.location}</Text>

          <View style={detailStyles.actionButtons}>
            <TouchableOpacity style={detailStyles.bookmarkButton}>
              <Ionicons
                name={company.isBookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color={company.isBookmarked ? "#8B5CF6" : "#6B7280"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={detailStyles.shareButton}>
              <Ionicons name="share-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Job Details */}
        <View style={detailStyles.section}>
          <Text style={detailStyles.sectionTitle}>Available Position</Text>
          <View style={detailStyles.jobCard}>
            <Text style={detailStyles.jobTitle}>{company.position}</Text>
            <View style={detailStyles.jobDetails}>
              <View style={detailStyles.jobDetailItem}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text style={detailStyles.jobDetailText}>3-6 months</Text>
              </View>
              <View style={detailStyles.jobDetailItem}>
                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                <Text style={detailStyles.jobDetailText}>Full-time</Text>
              </View>
              <View style={detailStyles.jobDetailItem}>
                <Ionicons name="location-outline" size={16} color="#6B7280" />
                <Text style={detailStyles.jobDetailText}>{company.distance} km away</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Company */}
        <View style={detailStyles.section}>
          <Text style={detailStyles.sectionTitle}>About the Company</Text>
          <Text style={detailStyles.description}>
            {company.name} is a leading company in the {company.field.toLowerCase()} sector in Cameroon. We offer
            exceptional internship opportunities for motivated students who want to gain practical experience in a
            dynamic professional environment.
          </Text>
        </View>

        {/* Requirements */}
        <View style={detailStyles.section}>
          <Text style={detailStyles.sectionTitle}>Requirements</Text>
          <View style={detailStyles.requirementsList}>
            <Text style={detailStyles.requirement}>• Currently enrolled in higher education</Text>
            <Text style={detailStyles.requirement}>• Motivation and team spirit</Text>
            <Text style={detailStyles.requirement}>• Proficiency in French and English</Text>
            <Text style={detailStyles.requirement}>• Available for 3-6 months</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={detailStyles.section}>
          <Text style={detailStyles.sectionTitle}>Contact</Text>
          <View style={detailStyles.contactInfo}>
            <View style={detailStyles.contactItem}>
              <Ionicons name="mail-outline" size={20} color="#8B5CF6" />
              <Text style={detailStyles.contactText}>careers@{company.name.toLowerCase().replace(/\s+/g, "")}.cm</Text>
            </View>
            <View style={detailStyles.contactItem}>
              <Ionicons name="call-outline" size={20} color="#8B5CF6" />
              <Text style={detailStyles.contactText}>+237 6XX XXX XXX</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={detailStyles.applyContainer}>
        <TouchableOpacity style={detailStyles.applyButton}>
          <Text style={detailStyles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// News Screen
const NewsScreen = () => {
  const newsItems = [
    {
      id: 1,
      company: "MTN Cameroon",
      title: "MTN launches new AI internship program",
      summary:
        "MTN Cameroon announces the opening of 50 internship positions in artificial intelligence for Cameroonian students.",
      time: "2h",
      category: "Telecommunications",
      isBookmarked: true,
    },
    {
      id: 2,
      company: "Orange Cameroun",
      title: "Orange invests in digital training",
      summary: "The telecom operator announces an investment to train 1000 young people in digital professions.",
      time: "4h",
      category: "Training",
      isBookmarked: true,
    },
    {
      id: 3,
      company: "Afriland First Bank",
      title: "New digital branch opens in Yaoundé",
      summary: "Afriland First Bank opens its first fully digital branch and recruits fintech interns.",
      time: "6h",
      category: "Banking",
      isBookmarked: true,
    },
    {
      id: 4,
      company: "Total Energies",
      title: "Total recruits 30 engineering interns",
      summary: "The oil company opens its doors to young graduates for a 6-month internship program.",
      time: "1d",
      category: "Energy",
      isBookmarked: true,
    },
    {
      id: 5,
      company: "CAMTEL",
      title: "CAMTEL modernizes fiber optic network",
      summary: "The public telecommunications company launches a modernization project and seeks engineering interns.",
      time: "2d",
      category: "Infrastructure",
      isBookmarked: false,
    },
  ]

  return (
    <SafeAreaView style={newsStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={newsStyles.header}>
          <Text style={newsStyles.title}>Company News</Text>
          <Text style={newsStyles.subtitle}>Latest updates from your bookmarked companies</Text>
        </View>

        <View style={newsStyles.newsList}>
          {newsItems.map((news) => (
            <TouchableOpacity key={news.id} style={newsStyles.newsCard}>
              <View style={newsStyles.newsHeader}>
                <View style={newsStyles.companyBadge}>
                  <Text style={newsStyles.companyBadgeText}>{news.company}</Text>
                </View>
                <Text style={newsStyles.timeText}>{news.time}</Text>
              </View>

              <Text style={newsStyles.newsTitle}>{news.title}</Text>
              <Text style={newsStyles.newsSummary}>{news.summary}</Text>

              <View style={newsStyles.newsFooter}>
                <View style={newsStyles.categoryBadge}>
                  <Text style={newsStyles.categoryText}>{news.category}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name={news.isBookmarked ? "bookmark" : "bookmark-outline"} size={20} color="#8B5CF6" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={newsStyles.loadMoreButton}>
          <Text style={newsStyles.loadMoreText}>Load more news</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

// Explore Screen
const ExploreScreen = () => {
  const [searchText, setSearchText] = useState("")
  const [selectedField, setSelectedField] = useState("All Fields")
  const [selectedLocation, setSelectedLocation] = useState("All Cities")
  const [showFilters, setShowFilters] = useState(false)

  const allCompanies = [
    {
      id: 1,
      name: "MTN Cameroon",
      position: "Software Engineering Intern",
      location: "Yaoundé",
      field: "Telecom",
      logo: "📱",
      openPositions: 5,
    },
    {
      id: 2,
      name: "Orange Cameroun",
      position: "Digital Marketing Intern",
      location: "Douala",
      field: "Telecom",
      logo: "🍊",
      openPositions: 3,
    },
    {
      id: 3,
      name: "Afriland First Bank",
      position: "Financial Analyst Intern",
      location: "Yaoundé",
      field: "Banking",
      logo: "🏦",
      openPositions: 2,
    },
    {
      id: 4,
      name: "CAMTEL",
      position: "Telecommunications Intern",
      location: "Buea",
      field: "Telecom",
      logo: "📡",
      openPositions: 4,
    },
    {
      id: 5,
      name: "Total Energies",
      position: "Petroleum Engineering Intern",
      location: "Douala",
      field: "Oil & Gas",
      logo: "⛽",
      openPositions: 6,
    },
    {
      id: 6,
      name: "Ecobank Cameroun",
      position: "IT Support Intern",
      location: "Yaoundé",
      field: "Banking",
      logo: "🏛️",
      openPositions: 3,
    },
    {
      id: 7,
      name: "Société Générale",
      position: "Credit Analyst Intern",
      location: "Bamenda",
      field: "Banking",
      logo: "🏦",
      openPositions: 2,
    },
    {
      id: 8,
      name: "Nexttel",
      position: "Network Engineer Intern",
      location: "Garoua",
      field: "Telecom",
      logo: "📶",
      openPositions: 3,
    },
  ]

  const fields = ["All Fields", "Telecom", "Banking", "Oil & Gas", "Tech", "Agriculture"]
  const cities = ["All Cities", "Yaoundé", "Douala", "Buea", "Bamenda", "Garoua", "Bafoussam"]

  const filteredCompanies = allCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      company.position.toLowerCase().includes(searchText.toLowerCase())
    const matchesField = selectedField === "All Fields" || company.field === selectedField
    const matchesLocation = selectedLocation === "All Cities" || company.location === selectedLocation
    return matchesSearch && matchesField && matchesLocation
  })

  return (
    <SafeAreaView style={exploreStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={exploreStyles.header}>
          <Text style={exploreStyles.title}>Explore Internships</Text>
          <Text style={exploreStyles.subtitle}>Discover opportunities across Cameroon</Text>
        </View>

        {/* Search Bar */}
        <View style={exploreStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={exploreStyles.searchIcon} />
          <TextInput
            style={exploreStyles.searchInput}
            placeholder="Search companies or positions..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filter Buttons */}
        <View style={exploreStyles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={exploreStyles.filterScroll}>
            <TouchableOpacity style={exploreStyles.filterButton} onPress={() => setShowFilters(!showFilters)}>
              <Ionicons name="options-outline" size={16} color="#8B5CF6" />
              <Text style={exploreStyles.filterButtonText}>Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity style={exploreStyles.filterChip}>
              <Text style={exploreStyles.filterChipText}>{selectedField}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={exploreStyles.filterChip}>
              <Text style={exploreStyles.filterChipText}>{selectedLocation}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Filter Options (Expandable) */}
        {showFilters && (
          <View style={exploreStyles.filterOptions}>
            <View style={exploreStyles.filterSection}>
              <Text style={exploreStyles.filterSectionTitle}>Field of Study</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {fields.map((field) => (
                  <TouchableOpacity
                    key={field}
                    style={[exploreStyles.filterOption, selectedField === field && exploreStyles.filterOptionActive]}
                    onPress={() => setSelectedField(field)}
                  >
                    <Text
                      style={[
                        exploreStyles.filterOptionText,
                        selectedField === field && exploreStyles.filterOptionTextActive,
                      ]}
                    >
                      {field}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={exploreStyles.filterSection}>
              <Text style={exploreStyles.filterSectionTitle}>Location</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {cities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={[exploreStyles.filterOption, selectedLocation === city && exploreStyles.filterOptionActive]}
                    onPress={() => setSelectedLocation(city)}
                  >
                    <Text
                      style={[
                        exploreStyles.filterOptionText,
                        selectedLocation === city && exploreStyles.filterOptionTextActive,
                      ]}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Results */}
        <View style={exploreStyles.resultsSection}>
          <View style={exploreStyles.resultsHeader}>
            <Text style={exploreStyles.resultsTitle}>Results</Text>
            <Text style={exploreStyles.resultsCount}>{filteredCompanies.length} internships found</Text>
          </View>

          {filteredCompanies.map((company) => (
            <TouchableOpacity key={company.id} style={exploreStyles.companyCard}>
              <View style={exploreStyles.companyHeader}>
                <View style={exploreStyles.companyLogo}>
                  <Text style={exploreStyles.companyLogoText}>{company.logo}</Text>
                </View>
                <View style={exploreStyles.companyInfo}>
                  <Text style={exploreStyles.companyName}>{company.name}</Text>
                  <Text style={exploreStyles.companyPosition}>{company.position}</Text>
                  <View style={exploreStyles.companyDetails}>
                    <View style={exploreStyles.detailItem}>
                      <Ionicons name="location-outline" size={14} color="#6B7280" />
                      <Text style={exploreStyles.detailText}>{company.location}</Text>
                    </View>
                    <View style={exploreStyles.detailItem}>
                      <Ionicons name="briefcase-outline" size={14} color="#6B7280" />
                      <Text style={exploreStyles.detailText}>{company.field}</Text>
                    </View>
                  </View>
                </View>
                <View style={exploreStyles.positionsInfo}>
                  <Text style={exploreStyles.positionsCount}>{company.openPositions}</Text>
                  <Text style={exploreStyles.positionsLabel}>positions</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {filteredCompanies.length === 0 && (
            <View style={exploreStyles.emptyState}>
              <Text style={exploreStyles.emptyStateText}>No internships found</Text>
              <Text style={exploreStyles.emptyStateSubtext}>Try adjusting your search filters</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Applications Screen
const ApplicationsScreen = () => {
  const [activeTab, setActiveTab] = useState("active")

  const activeApplications = [
    {
      id: 1,
      company: "MTN Cameroon",
      position: "Software Engineering Intern",
      location: "Yaoundé",
      appliedDate: "May 15, 2024",
      status: "In Review",
      logo: "📱",
      statusColor: "#F59E0B",
      nextStep: "Interview scheduled for May 25",
    },
    {
      id: 2,
      company: "Orange Cameroun",
      position: "Digital Marketing Intern",
      location: "Douala",
      appliedDate: "May 18, 2024",
      status: "Applied",
      logo: "🍊",
      statusColor: "#3B82F6",
      nextStep: "Application under review",
    },
    {
      id: 3,
      company: "Total Energies",
      position: "Petroleum Engineering Intern",
      location: "Douala",
      appliedDate: "May 20, 2024",
      status: "Interview",
      logo: "⛽",
      statusColor: "#8B5CF6",
      nextStep: "Final interview on May 28",
    },
  ]

  const savedApplications = [
    {
      id: 4,
      company: "Afriland First Bank",
      position: "Financial Analyst Intern",
      location: "Yaoundé",
      savedDate: "May 10, 2024",
      logo: "🏦",
      deadline: "May 30, 2024",
    },
    {
      id: 5,
      company: "CAMTEL",
      position: "Telecommunications Intern",
      location: "Buea",
      savedDate: "May 12, 2024",
      logo: "📡",
      deadline: "June 5, 2024",
    },
    {
      id: 6,
      company: "Ecobank Cameroun",
      position: "IT Support Intern",
      location: "Yaoundé",
      savedDate: "May 14, 2024",
      logo: "🏛️",
      deadline: "June 1, 2024",
    },
  ]

  const applicationHistory = [
    {
      id: 7,
      company: "Société Générale",
      position: "Credit Analyst Intern",
      location: "Bamenda",
      appliedDate: "April 10, 2024",
      status: "Rejected",
      logo: "🏦",
      statusColor: "#EF4444",
      feedback: "Position filled by another candidate",
    },
    {
      id: 8,
      company: "Nexttel",
      position: "Network Engineer Intern",
      location: "Garoua",
      appliedDate: "April 5, 2024",
      status: "Expired",
      logo: "📶",
      statusColor: "#6B7280",
      feedback: "Application deadline passed",
    },
    {
      id: 9,
      company: "UBA Cameroun",
      position: "Banking Intern",
      location: "Yaoundé",
      appliedDate: "March 28, 2024",
      status: "Withdrawn",
      logo: "🏦",
      statusColor: "#6B7280",
      feedback: "Withdrew application",
    },
  ]

  const renderActiveApplications = () => (
    <View style={applicationsStyles.tabContent}>
      {activeApplications.map((app) => (
        <TouchableOpacity key={app.id} style={applicationsStyles.applicationCard}>
          <View style={applicationsStyles.cardHeader}>
            <View style={applicationsStyles.companyLogo}>
              <Text style={applicationsStyles.companyLogoText}>{app.logo}</Text>
            </View>
            <View style={applicationsStyles.applicationInfo}>
              <View style={applicationsStyles.titleRow}>
                <Text style={applicationsStyles.companyName}>{app.company}</Text>
                <View style={[applicationsStyles.statusBadge, { backgroundColor: app.statusColor }]}>
                  <Text style={applicationsStyles.statusText}>{app.status}</Text>
                </View>
              </View>
              <Text style={applicationsStyles.positionTitle}>{app.position}</Text>
              <View style={applicationsStyles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text style={applicationsStyles.locationText}>{app.location}</Text>
              </View>
            </View>
          </View>

          <View style={applicationsStyles.applicationDetails}>
            <View style={applicationsStyles.detailRow}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={applicationsStyles.detailText}>Applied on {app.appliedDate}</Text>
            </View>
            <View style={applicationsStyles.detailRow}>
              <Ionicons name="information-circle-outline" size={16} color="#8B5CF6" />
              <Text style={applicationsStyles.nextStepText}>{app.nextStep}</Text>
            </View>
          </View>

          <View style={applicationsStyles.actionButtons}>
            <TouchableOpacity style={applicationsStyles.secondaryButton}>
              <Text style={applicationsStyles.secondaryButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={applicationsStyles.primaryButton}>
              <Text style={applicationsStyles.primaryButtonText}>Update Status</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      {activeApplications.length === 0 && (
        <View style={applicationsStyles.emptyState}>
          <Ionicons name="briefcase-outline" size={64} color="#D1D5DB" />
          <Text style={applicationsStyles.emptyStateTitle}>No Active Applications</Text>
          <Text style={applicationsStyles.emptyStateText}>
            Start applying to internships to track your progress here
          </Text>
          <TouchableOpacity style={applicationsStyles.exploreButton}>
            <Text style={applicationsStyles.exploreButtonText}>Explore Internships</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )

  const renderSavedApplications = () => (
    <View style={applicationsStyles.tabContent}>
      {savedApplications.map((app) => (
        <TouchableOpacity key={app.id} style={applicationsStyles.applicationCard}>
          <View style={applicationsStyles.cardHeader}>
            <View style={applicationsStyles.companyLogo}>
              <Text style={applicationsStyles.companyLogoText}>{app.logo}</Text>
            </View>
            <View style={applicationsStyles.applicationInfo}>
              <Text style={applicationsStyles.companyName}>{app.company}</Text>
              <Text style={applicationsStyles.positionTitle}>{app.position}</Text>
              <View style={applicationsStyles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text style={applicationsStyles.locationText}>{app.location}</Text>
              </View>
            </View>
            <TouchableOpacity style={applicationsStyles.bookmarkButton}>
              <Ionicons name="bookmark" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          <View style={applicationsStyles.applicationDetails}>
            <View style={applicationsStyles.detailRow}>
              <Ionicons name="bookmark-outline" size={16} color="#6B7280" />
              <Text style={applicationsStyles.detailText}>Saved on {app.savedDate}</Text>
            </View>
            <View style={applicationsStyles.detailRow}>
              <Ionicons name="time-outline" size={16} color="#EF4444" />
              <Text style={applicationsStyles.deadlineText}>Deadline: {app.deadline}</Text>
            </View>
          </View>

          <View style={applicationsStyles.actionButtons}>
            <TouchableOpacity style={applicationsStyles.secondaryButton}>
              <Text style={applicationsStyles.secondaryButtonText}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={applicationsStyles.primaryButton}>
              <Text style={applicationsStyles.primaryButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      {savedApplications.length === 0 && (
        <View style={applicationsStyles.emptyState}>
          <Ionicons name="bookmark-outline" size={64} color="#D1D5DB" />
          <Text style={applicationsStyles.emptyStateTitle}>No Saved Internships</Text>
          <Text style={applicationsStyles.emptyStateText}>
            Bookmark internships you're interested in to save them for later
          </Text>
          <TouchableOpacity style={applicationsStyles.exploreButton}>
            <Text style={applicationsStyles.exploreButtonText}>Explore Internships</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )

  const renderApplicationHistory = () => (
    <View style={applicationsStyles.tabContent}>
      {applicationHistory.map((app) => (
        <TouchableOpacity key={app.id} style={applicationsStyles.applicationCard}>
          <View style={applicationsStyles.cardHeader}>
            <View style={applicationsStyles.companyLogo}>
              <Text style={applicationsStyles.companyLogoText}>{app.logo}</Text>
            </View>
            <View style={applicationsStyles.applicationInfo}>
              <View style={applicationsStyles.titleRow}>
                <Text style={applicationsStyles.companyName}>{app.company}</Text>
                <View style={[applicationsStyles.statusBadge, { backgroundColor: app.statusColor }]}>
                  <Text style={applicationsStyles.statusText}>{app.status}</Text>
                </View>
              </View>
              <Text style={applicationsStyles.positionTitle}>{app.position}</Text>
              <View style={applicationsStyles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text style={applicationsStyles.locationText}>{app.location}</Text>
              </View>
            </View>
          </View>

          <View style={applicationsStyles.applicationDetails}>
            <View style={applicationsStyles.detailRow}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={applicationsStyles.detailText}>Applied on {app.appliedDate}</Text>
            </View>
            <View style={applicationsStyles.detailRow}>
              <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
              <Text style={applicationsStyles.feedbackText}>{app.feedback}</Text>
            </View>
          </View>

          <View style={applicationsStyles.actionButtons}>
            <TouchableOpacity style={applicationsStyles.secondaryButton}>
              <Text style={applicationsStyles.secondaryButtonText}>View Details</Text>
            </TouchableOpacity>
            {app.status === "Rejected" && (
              <TouchableOpacity style={applicationsStyles.primaryButton}>
                <Text style={applicationsStyles.primaryButtonText}>Apply Again</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}

      {applicationHistory.length === 0 && (
        <View style={applicationsStyles.emptyState}>
          <Ionicons name="time-outline" size={64} color="#D1D5DB" />
          <Text style={applicationsStyles.emptyStateTitle}>No Application History</Text>
          <Text style={applicationsStyles.emptyStateText}>Your completed applications will appear here</Text>
        </View>
      )}
    </View>
  )

  return (
    <SafeAreaView style={applicationsStyles.container}>
      {/* Header */}
      <View style={applicationsStyles.header}>
        <Text style={applicationsStyles.title}>My Applications</Text>
        <Text style={applicationsStyles.subtitle}>Track your internship applications</Text>
      </View>

      {/* Tab Navigation */}
      <View style={applicationsStyles.tabNavigation}>
        {[
          { key: "active", label: "Active", count: activeApplications.length },
          { key: "saved", label: "Saved", count: savedApplications.length },
          { key: "history", label: "History", count: applicationHistory.length },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[applicationsStyles.tabButton, activeTab === tab.key && applicationsStyles.tabButtonActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                applicationsStyles.tabButtonText,
                activeTab === tab.key && applicationsStyles.tabButtonTextActive,
              ]}
            >
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={applicationsStyles.tabBadge}>
                <Text style={applicationsStyles.tabBadgeText}>{tab.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={applicationsStyles.scrollView}>
        {activeTab === "active" && renderActiveApplications()}
        {activeTab === "saved" && renderSavedApplications()}
        {activeTab === "history" && renderApplicationHistory()}
      </ScrollView>
    </SafeAreaView>
  )
}

// NEW: Profile Screen
const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const userStats = [
    { label: "Applications", value: "12", icon: "briefcase-outline" },
    { label: "Bookmarks", value: "8", icon: "bookmark-outline" },
    { label: "Profile Views", value: "24", icon: "eye-outline" },
  ]

  const menuItems = [
    {
      section: "Account",
      items: [
        { title: "Edit Profile", icon: "person-outline", action: "edit-profile" },
        { title: "Resume & CV", icon: "document-text-outline", action: "resume" },
        { title: "Academic Records", icon: "school-outline", action: "academic" },
        { title: "Preferences", icon: "settings-outline", action: "preferences" },
      ],
    },
    {
      section: "Application",
      items: [
        { title: "Notification Settings", icon: "notifications-outline", action: "notifications" },
        { title: "Privacy Settings", icon: "shield-outline", action: "privacy" },
        { title: "Language", icon: "language-outline", action: "language", value: "English" },
        { title: "Location Services", icon: "location-outline", action: "location" },
      ],
    },
    {
      section: "Support",
      items: [
        { title: "Help Center", icon: "help-circle-outline", action: "help" },
        { title: "Contact Support", icon: "mail-outline", action: "support" },
        { title: "Rate INEX", icon: "star-outline", action: "rate" },
        { title: "About", icon: "information-circle-outline", action: "about" },
      ],
    },
  ]

  const handleMenuAction = (action: string) => {
    console.log("Menu action:", action)
    // Handle different menu actions here
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={profileStyles.header}>
          <View style={profileStyles.profileImageContainer}>
            <View style={profileStyles.profileImage}>
              <Text style={profileStyles.profileImageText}>JM</Text>
            </View>
            <TouchableOpacity style={profileStyles.editImageButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={profileStyles.userName}>Steve fombad</Text>
          <Text style={profileStyles.userTitle}>Computer Science Student</Text>
          <Text style={profileStyles.userLocation}>University of Yaoundé I</Text>

          <TouchableOpacity style={profileStyles.editProfileButton}>
            <Ionicons name="create-outline" size={16} color="#8B5CF6" />
            <Text style={profileStyles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={profileStyles.statsContainer}>
          {userStats.map((stat, index) => (
            <View key={index} style={profileStyles.statCard}>
              <Ionicons name={stat.icon as any} size={24} color="#8B5CF6" />
              <Text style={profileStyles.statValue}>{stat.value}</Text>
              <Text style={profileStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={profileStyles.menuSection}>
            <Text style={profileStyles.sectionTitle}>{section.section}</Text>
            <View style={profileStyles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[profileStyles.menuItem, itemIndex === section.items.length - 1 && profileStyles.menuItemLast]}
                  onPress={() => handleMenuAction(item.action)}
                >
                  <View style={profileStyles.menuItemLeft}>
                    <View style={profileStyles.menuIconContainer}>
                      <Ionicons name={item.icon as any} size={20} color="#6B7280" />
                    </View>
                    <Text style={profileStyles.menuItemText}>{item.title}</Text>
                  </View>

                  <View style={profileStyles.menuItemRight}>
                    {item.value && <Text style={profileStyles.menuItemValue}>{item.value}</Text>}
                    {item.action === "notifications" && (
                      <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
                        thumbColor="#fff"
                      />
                    )}
                    {item.action === "location" && (
                      <Switch
                        value={locationEnabled}
                        onValueChange={setLocationEnabled}
                        trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
                        thumbColor="#fff"
                      />
                    )}
                    {!item.value && item.action !== "notifications" && item.action !== "location" && (
                      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Advanced Settings */}
        <View style={profileStyles.menuSection}>
          <Text style={profileStyles.sectionTitle}>Advanced</Text>
          <View style={profileStyles.menuCard}>
            <TouchableOpacity style={profileStyles.menuItem}>
              <View style={profileStyles.menuItemLeft}>
                <View style={profileStyles.menuIconContainer}>
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                </View>
                <Text style={profileStyles.menuItemText}>Email Notifications</Text>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
                thumbColor="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity style={profileStyles.menuItem}>
              <View style={profileStyles.menuItemLeft}>
                <View style={profileStyles.menuIconContainer}>
                  <Ionicons name="moon-outline" size={20} color="#6B7280" />
                </View>
                <Text style={profileStyles.menuItemText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
                thumbColor="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity style={[profileStyles.menuItem, profileStyles.menuItemLast]}>
              <View style={profileStyles.menuItemLeft}>
                <View style={profileStyles.menuIconContainer}>
                  <Ionicons name="cloud-download-outline" size={20} color="#6B7280" />
                </View>
                <Text style={profileStyles.menuItemText}>Data & Storage</Text>
              </View>
              <View style={profileStyles.menuItemRight}>
                <Text style={profileStyles.menuItemValue}>2.4 MB</Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={profileStyles.appInfo}>
          <Text style={profileStyles.appInfoText}>INEX v1.0.0</Text>
          <Text style={profileStyles.appInfoSubtext}>Made with ❤️ for Cameroonian students</Text>
        </View>

        {/* Logout Button */}
        <View style={profileStyles.logoutContainer}>
          <TouchableOpacity style={profileStyles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={profileStyles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Map Screen with Free Map Implementation
const MapScreen = ({ navigation }: any) => {
  const [selectedCity, setSelectedCity] = useState("Yaoundé")
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  const cameroonCities = {
    Yaoundé: { latitude: 3.848, longitude: 11.5021 },
    Douala: { latitude: 4.0511, longitude: 9.7679 },
    Buea: { latitude: 4.1549, longitude: 9.2571 },
    Bamenda: { latitude: 5.9597, longitude: 10.1463 },
    Garoua: { latitude: 9.3265, longitude: 13.3958 },
    Bafoussam: { latitude: 5.4781, longitude: 10.4167 },
  }

  const companiesWithLocations = [
    {
      id: 1,
      name: "MTN Cameroon",
      position: "Software Engineering Intern",
      location: "Yaoundé",
      distance: "1.2",
      coordinates: { latitude: 3.848, longitude: 11.5021 },
    },
    {
      id: 2,
      name: "Orange Cameroun",
      position: "Digital Marketing Intern",
      location: "Douala",
      distance: "2.5",
      coordinates: { latitude: 4.0511, longitude: 9.7679 },
    },
    {
      id: 3,
      name: "Afriland First Bank",
      position: "Financial Analyst Intern",
      location: "Yaoundé",
      distance: "0.8",
      coordinates: { latitude: 3.858, longitude: 11.518 },
    },
    {
      id: 4,
      name: "CAMTEL",
      position: "Telecommunications Intern",
      location: "Buea",
      distance: "15.5",
      coordinates: { latitude: 4.1549, longitude: 9.2571 },
    },
  ]

  return (
    <SafeAreaView style={mapStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={mapStyles.header}>
          <Text style={mapStyles.title}>Internships Map</Text>
          <Text style={mapStyles.subtitle}>Find opportunities near you</Text>
        </View>

        {/* City Selector */}
        <View style={mapStyles.citySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(cameroonCities).map((city) => (
              <TouchableOpacity
                key={city}
                style={[mapStyles.cityButton, selectedCity === city && mapStyles.cityButtonActive]}
                onPress={() => setSelectedCity(city)}
              >
                <Text style={[mapStyles.cityButtonText, selectedCity === city && mapStyles.cityButtonTextActive]}>
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Map Placeholder (will be replaced with real map) */}
        <View style={mapStyles.mapContainer}>
          <View style={mapStyles.mapPlaceholder}>
            <Ionicons name="map" size={48} color="#8B5CF6" />
            <Text style={mapStyles.mapPlaceholderText}>Interactive map for {selectedCity}</Text>
            <Text style={mapStyles.mapPlaceholderSubtext}>
              Showing {companiesWithLocations.filter((c) => c.location === selectedCity).length} companies
            </Text>
          </View>

          {/* Map pins overlay */}
          <View style={mapStyles.pinsOverlay}>
            <View style={[mapStyles.pin, { top: "25%", left: "30%" }]}>
              <Ionicons name="location" size={24} color="#8B5CF6" />
            </View>
            <View style={[mapStyles.pin, { top: "50%", left: "60%" }]}>
              <Ionicons name="location" size={24} color="#8B5CF6" />
            </View>
            <View style={[mapStyles.pin, { top: "70%", left: "40%" }]}>
              <Ionicons name="location" size={24} color="#8B5CF6" />
            </View>
          </View>
        </View>

        {/* Companies List */}
        <View style={mapStyles.companiesSection}>
          <Text style={mapStyles.sectionTitle}>Companies in {selectedCity}</Text>

          {companiesWithLocations
            .filter((company) => company.location === selectedCity)
            .map((company) => (
              <TouchableOpacity
                key={company.id}
                style={mapStyles.companyCard}
                onPress={() => navigation.navigate("CompanyDetail", { company })}
              >
                <View style={mapStyles.companyHeader}>
                  <View style={mapStyles.companyLogo}>
                    <Text style={mapStyles.companyLogoText}>{company.name.substring(0, 2).toUpperCase()}</Text>
                  </View>
                  <View style={mapStyles.companyInfo}>
                    <Text style={mapStyles.companyName}>{company.name}</Text>
                    <Text style={mapStyles.companyPosition}>{company.position}</Text>
                    <View style={mapStyles.locationContainer}>
                      <Ionicons name="location-outline" size={14} color="#6B7280" />
                      <Text style={mapStyles.locationText}>
                        {company.distance} km • {company.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Stack Navigator for Dashboard and Company Detail
const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DashboardMain" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="CompanyDetail"
        component={CompanyDetailScreen}
        options={({ route }: any) => ({
          title: route.params?.company?.name || "Details",
          headerStyle: { backgroundColor: "#8B5CF6" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        })}
      />
    </Stack.Navigator>
  )
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home"

          switch (route.name) {
            case "Dashboard":
              iconName = "home"
              break
            case "Explore":
              iconName = "search"
              break
            case "News":
              iconName = "newspaper"
              break
            case "Applications":
              iconName = "briefcase"
              break
            case "Profile":
              iconName = "person"
              break
            case "Map":
              iconName = "map"
              break
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#8B5CF6",
        tabBarInactiveTintColor: "#6B7280",
        headerStyle: {
          backgroundColor: "#8B5CF6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} options={{ headerShown: false }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <Tab.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Applications" component={ApplicationsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

// Dashboard styles (same as before)
const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
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
    color: "#1F2937",
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
    backgroundColor: "#fff",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryButtonActive: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  categoryText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B5CF6",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  companiesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  companyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  companyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#1F2937",
  },
  companyPosition: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  bookmarkButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
})

// Company Detail styles (same as before)
const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  companyLogoLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  companyLogoTextLarge: {
    fontSize: 32,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  companyLocation: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  bookmarkButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  shareButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  jobCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  jobDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  jobDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  jobDetailText: {
    fontSize: 14,
    color: "#6B7280",
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
  },
  requirementsList: {
    gap: 8,
  },
  requirement: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: "#4B5563",
  },
  applyContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  applyButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

// News styles (same as before)
const newsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  newsList: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  companyBadge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  companyBadgeText: {
    fontSize: 12,
    color: "#8B5CF6",
    fontWeight: "600",
  },
  timeText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  newsSummary: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  loadMoreButton: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loadMoreText: {
    fontSize: 16,
    color: "#8B5CF6",
    fontWeight: "600",
  },
})

// Explore styles (same as before)
const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
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
    color: "#1F2937",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterScroll: {
    flexDirection: "row",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#8B5CF6",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#8B5CF6",
    fontWeight: "500",
    marginLeft: 6,
  },
  filterChip: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 14,
    color: "#8B5CF6",
    fontWeight: "500",
  },
  filterOptions: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
  },
  filterOptionActive: {
    backgroundColor: "#8B5CF6",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  filterOptionTextActive: {
    color: "#fff",
  },
  resultsSection: {
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  resultsCount: {
    fontSize: 14,
    color: "#6B7280",
  },
  companyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  companyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#1F2937",
  },
  companyPosition: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  companyDetails: {
    flexDirection: "row",
    marginTop: 4,
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: "#6B7280",
  },
  positionsInfo: {
    alignItems: "center",
  },
  positionsCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B5CF6",
  },
  positionsLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
})

// Applications styles
const applicationsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  tabNavigation: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  tabButtonActive: {
    backgroundColor: "#8B5CF6",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  tabButtonTextActive: {
    color: "#fff",
  },
  tabBadge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  applicationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  companyLogoText: {
    fontSize: 20,
  },
  applicationInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  positionTitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  bookmarkButton: {
    padding: 8,
  },
  applicationDetails: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },
  nextStepText: {
    fontSize: 14,
    color: "#8B5CF6",
    fontWeight: "500",
    marginLeft: 8,
  },
  deadlineText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
    marginLeft: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
    fontStyle: "italic",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#8B5CF6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

// NEW: Profile styles
const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  editProfileText: {
    fontSize: 14,
    color: "#8B5CF6",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  menuCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuItemValue: {
    fontSize: 14,
    color: "#6B7280",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },
  appInfoText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  appInfoSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "600",
  },
})

// Map styles
const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  citySelector: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
  },
  cityButtonActive: {
    backgroundColor: "#8B5CF6",
  },
  cityButtonText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  cityButtonTextActive: {
    color: "#fff",
  },
  mapContainer: {
    height: 300,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 12,
    textAlign: "center",
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  pinsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pin: {
    position: "absolute",
  },
  companiesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  companyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  companyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  companyLogoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B5CF6",
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  companyPosition: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
})

// Regular styles for other screens
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  screenText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#6B7280",
  },
})

export default MainTabNavigator
