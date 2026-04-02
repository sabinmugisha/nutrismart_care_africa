'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';

interface SystemStats {
  totalUsers: number;
  activeConsultations: number;
  totalRegistrations: number;
  verifiedProviders: number;
  pendingProviders: number;
  schoolsEnrolled: number;
  ngosPartnered: number;
}

interface UserRecord {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  is_active: boolean;
}

interface ProviderRecord {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  specialization: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

type AdminTab = 'overview' | 'users' | 'providers' | 'institutions';

const AdminPortalInteractive = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    activeConsultations: 0,
    totalRegistrations: 0,
    verifiedProviders: 0,
    pendingProviders: 0,
    schoolsEnrolled: 12,
    ngosPartnered: 8,
  });
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [providers, setProviders] = useState<ProviderRecord[]>([]);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    await Promise.all([loadStats(), loadUsers(), loadProviders()]);
    setIsLoading(false);
  };

  const loadStats = async () => {
    const [usersRes, consultRes, providersRes] = await Promise.all([
      supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
      supabase.from('consultations').select('id', { count: 'exact', head: true }).eq('status', 'confirmed'),
      supabase.from('nutrition_providers').select('id, availability_status'),
    ]);

    const totalUsers = usersRes.count || 0;
    const activeConsultations = consultRes.count || 0;
    const allProviders = providersRes.data || [];
    const verifiedProviders = allProviders.filter((p) => p.availability_status === 'available' || p.availability_status === 'verified').length;
    const pendingProviders = allProviders.filter((p) => p.availability_status === 'pending' || p.availability_status === 'unavailable').length;

    setStats((prev) => ({
      ...prev,
      totalUsers,
      activeConsultations,
      totalRegistrations: totalUsers,
      verifiedProviders,
      pendingProviders,
    }));
  };

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, full_name, email, role, created_at, is_active')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setUsers(data as UserRecord[]);
    }
  };

  const loadProviders = async () => {
    // Get provider user_ids first
    const { data: providerData, error: providerError } = await supabase
      .from('nutrition_providers')
      .select('id, user_id, specializations, availability_status, created_at')
      .order('created_at', { ascending: false });

    if (providerError || !providerData) return;

    // Get user profiles for those providers
    const userIds = providerData.map((p) => p.user_id);
    const { data: profileData } = await supabase
      .from('user_profiles')
      .select('id, full_name, email, is_active')
      .in('id', userIds);

    const profileMap: Record<string, { full_name: string; email: string; is_active: boolean }> = {};
    (profileData || []).forEach((p) => {
      profileMap[p.id] = { full_name: p.full_name, email: p.email, is_active: p.is_active };
    });

    const mapped: ProviderRecord[] = providerData.map((p) => ({
      id: p.id,
      user_id: p.user_id,
      full_name: profileMap[p.user_id]?.full_name || 'Unknown Provider',
      email: profileMap[p.user_id]?.email || '',
      specialization: p.specializations?.[0] || 'General Nutrition',
      is_verified: p.availability_status === 'available' || p.availability_status === 'verified',
      is_active: profileMap[p.user_id]?.is_active !== false,
      created_at: p.created_at,
    }));

    setProviders(mapped);
  };

  const handleProviderAction = async (providerId: string, action: 'approve' | 'deactivate') => {
    const updates =
      action === 'approve'
        ? { availability_status: 'available' }
        : { availability_status: 'unavailable' };

    const { error } = await supabase
      .from('nutrition_providers')
      .update(updates)
      .eq('id', providerId);

    if (!error) {
      setActionMessage(
        action === 'approve' ? 'Provider approved successfully' : 'Provider deactivated successfully'
      );
      setTimeout(() => setActionMessage(null), 3000);
      await loadProviders();
      await loadStats();
    }
  };

  const handleUserAction = async (userId: string, isActive: boolean) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ is_active: !isActive })
      .eq('id', userId);

    if (!error) {
      setActionMessage(!isActive ? 'User activated' : 'User deactivated');
      setTimeout(() => setActionMessage(null), 3000);
      await loadUsers();
    }
  };

  const tabs: { key: AdminTab; label: string; icon: string }[] = [
    { key: 'overview', label: t('admin.systemStats'), icon: 'ChartBarIcon' },
    { key: 'users', label: t('admin.userManagement'), icon: 'UsersIcon' },
    { key: 'providers', label: t('admin.providerVerification'), icon: 'CheckBadgeIcon' },
    { key: 'institutions', label: t('admin.institutionDashboard'), icon: 'BuildingOfficeIcon' },
  ];

  const statCards = [
    { label: t('admin.totalUsers'), value: stats.totalUsers, icon: 'UsersIcon', color: 'bg-primary' },
    { label: t('admin.activeConsultations'), value: stats.activeConsultations, icon: 'CalendarIcon', color: 'bg-accent' },
    { label: t('admin.totalRegistrations'), value: stats.totalRegistrations, icon: 'DocumentTextIcon', color: 'bg-secondary' },
    { label: 'Verified Providers', value: stats.verifiedProviders, icon: 'CheckBadgeIcon', color: 'bg-success' },
    { label: 'Pending Verification', value: stats.pendingProviders, icon: 'ClockIcon', color: 'bg-warning' },
    { label: 'Schools Enrolled', value: stats.schoolsEnrolled, icon: 'AcademicCapIcon', color: 'bg-primary/70' },
    { label: 'NGO Partners', value: stats.ngosPartnered, icon: 'BuildingOfficeIcon', color: 'bg-accent/70' },
    { label: t('admin.institutionalImpact'), value: stats.schoolsEnrolled + stats.ngosPartnered, icon: 'GlobeAltIcon', color: 'bg-success/70' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Message */}
      {actionMessage && (
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
          <Icon name="CheckCircleIcon" size={20} className="text-success" />
          <p className="text-sm text-success font-medium">{actionMessage}</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-card-foreground'
            }`}
          >
            <Icon name={tab.icon as any} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border shadow-sm">
                <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                  <Icon name={card.icon as any} size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold font-heading text-card-foreground">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Impact Metrics */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">
              {t('admin.institutionalImpact')} — Rwanda
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Stunting Reduction', value: '18%', desc: 'Improvement in child growth metrics via isombe & amateke programs', color: 'text-success' },
                { label: 'NCD Awareness', value: '2,400+', desc: 'Community members educated on NCDs through uburo & ibirayi nutrition', color: 'text-primary' },
                { label: 'Meal Plans Distributed', value: '5,200+', desc: 'Culturally-adapted plans with local foods delivered', color: 'text-accent' },
              ].map((metric, i) => (
                <div key={i} className="p-4 bg-muted/50 rounded-lg">
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <p className="text-sm font-medium text-card-foreground mt-1">{metric.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold font-heading text-card-foreground">{t('admin.userManagement')}</h3>
            <p className="text-sm text-muted-foreground">{users.length} total users</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Email</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Role</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-smooth">
                    <td className="px-4 py-3 font-medium text-card-foreground">{u.full_name || 'N/A'}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.is_active !== false ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      }`}>
                        {u.is_active !== false ? t('admin.active') : t('admin.inactive')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {u.id !== user?.id && (
                        <button
                          onClick={() => handleUserAction(u.id, u.is_active !== false)}
                          className="text-xs px-3 py-1 rounded-lg border border-border hover:bg-muted transition-smooth text-muted-foreground"
                        >
                          {u.is_active !== false ? t('admin.deactivate') : t('admin.approve')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Provider Verification Tab */}
      {activeTab === 'providers' && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold font-heading text-card-foreground">{t('admin.providerVerification')}</h3>
            <p className="text-sm text-muted-foreground">
              {stats.pendingProviders} pending · {stats.verifiedProviders} verified
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Provider</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Specialization</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Verification</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-smooth">
                    <td className="px-4 py-3">
                      <p className="font-medium text-card-foreground">{p.full_name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.specialization}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.is_verified ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {p.is_verified ? t('admin.verified') : t('admin.unverified')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.is_active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      }`}>
                        {p.is_active ? t('admin.active') : t('admin.inactive')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {!p.is_verified && (
                          <button
                            onClick={() => handleProviderAction(p.id, 'approve')}
                            className="text-xs px-3 py-1 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-smooth font-medium"
                          >
                            {t('admin.approve')}
                          </button>
                        )}
                        {p.is_active && (
                          <button
                            onClick={() => handleProviderAction(p.id, 'deactivate')}
                            className="text-xs px-3 py-1 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-smooth font-medium"
                          >
                            {t('admin.deactivate')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {providers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No providers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Institution Dashboard Tab */}
      {activeTab === 'institutions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Maternal Nutrition Initiative', type: 'Hospital', participants: 1247, completion: 87, status: 'Active', color: 'bg-primary' },
              { name: 'School Feeding Program', type: 'School', participants: 3420, completion: 72, status: 'Active', color: 'bg-accent' },
              { name: 'Rural NGO Nutrition Drive', type: 'NGO', participants: 890, completion: 65, status: 'Active', color: 'bg-secondary' },
              { name: 'Workplace Wellness Program', type: 'Workplace', participants: 540, completion: 91, status: 'Active', color: 'bg-success' },
            ].map((prog, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-card-foreground">{prog.name}</h4>
                    <span className="text-xs text-muted-foreground">{prog.type}</span>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">{prog.status}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-medium text-card-foreground">{prog.participants.toLocaleString()}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium text-card-foreground">{prog.completion}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className={`${prog.color} h-2 rounded-full`} style={{ width: `${prog.completion}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Global Monitoring */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">Global Monitoring — System Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Registrations', value: stats.totalRegistrations, icon: 'DocumentTextIcon' },
                { label: 'Active Consultations', value: stats.activeConsultations, icon: 'CalendarIcon' },
                { label: 'Schools Enrolled', value: stats.schoolsEnrolled, icon: 'AcademicCapIcon' },
                { label: 'NGO Partners', value: stats.ngosPartnered, icon: 'BuildingOfficeIcon' },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 bg-muted/50 rounded-lg">
                  <Icon name={item.icon as any} size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-card-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortalInteractive;
