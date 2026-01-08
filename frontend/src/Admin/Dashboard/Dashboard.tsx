import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Calendar,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Award,
} from "lucide-react";

// --- Interfaces ---
interface CircleProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  delay?: number;
}

interface MiniCircleProgressProps {
  percentage: number;
  size?: number;
  color?: string;
}

interface AnimatedBarProps {
  height: number;
  color: string;
  delay: number;
  width?: number;
}

// --- Components ---

const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  delay = 0,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = percentage / 60;
      const animate = () => {
        current += increment;
        if (current < percentage) {
          setAnimatedPercentage(current);
          requestAnimationFrame(animate);
        } else {
          setAnimatedPercentage(percentage);
        }
      };
      animate();
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-gray-700 opacity-20" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(animatedPercentage)}%</span>
      </div>
    </div>
  );
};

const MiniCircleProgress: React.FC<MiniCircleProgressProps> = ({ percentage, size = 60, color = "#10b981" }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={6} fill="none" className="text-gray-700 opacity-30" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-white">{Math.round(animatedPercentage)}%</span>
      </div>
    </div>
  );
};

const AnimatedBar: React.FC<AnimatedBarProps> = ({ height, color, delay, width = 8 }) => {
  const [barHeight, setBarHeight] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setBarHeight(height), delay);
    return () => clearTimeout(timer);
  }, [height, delay]);

  return (
    <div 
      className={`bg-gradient-to-t ${color} rounded-t-lg transition-all duration-1000 ease-out`} 
      style={{ height: `${barHeight}px`, width: `${width}px` }} 
    />
  );
};

// --- Main Dashboard ---

const Dashboard: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { title: "Total Revenue", value: "$124,590", change: "+14.2%", progress: 78, icon: <DollarSign size={20} />, trend: "up", color: "text-emerald-400", bgColor: "bg-emerald-500/10", progressColor: "#10b981" },
    { title: "Active Users", value: "8,549", change: "+8.1%", progress: 65, icon: <Users size={20} />, trend: "up", color: "text-blue-400", bgColor: "bg-blue-500/10", progressColor: "#3b82f6" },
    { title: "Total Orders", value: "2,847", change: "+23.5%", progress: 92, icon: <ShoppingCart size={20} />, trend: "up", color: "text-purple-400", bgColor: "bg-purple-500/10", progressColor: "#8b5cf6" },
    { title: "Conversion Rate", value: "2.84%", change: "-1.2%", progress: 45, icon: <Activity size={20} />, trend: "down", color: "text-orange-400", bgColor: "bg-orange-500/10", progressColor: "#f59e0b" },
  ];

  const transactions = [
    { id: 1, customer: "Emma Watson", product: "Premium Plan", amount: "$99.00", status: "completed", avatar: "EW" },
    { id: 2, customer: "Michael Chen", product: "Design Pack", amount: "$299.00", status: "completed", avatar: "MC" },
    { id: 3, customer: "Sarah Johnson", product: "Consultation", amount: "$150.00", status: "pending", avatar: "SJ" },
    { id: 4, customer: "David Rodriguez", product: "Annual Plan", amount: "$599.00", status: "completed", avatar: "DR" },
  ];

  // Hydration safety check
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Analytics Overview
            </h1>
            <p className="text-gray-400 flex items-center gap-2 mt-1">
              <Calendar size={16} /> Live Data Feed
            </p>
          </div>
          <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-all shadow-lg shadow-red-900/20">
            Download Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-900 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                  {stat.icon}
                </div>
                <MiniCircleProgress percentage={stat.progress} color={stat.progressColor} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className={`flex items-center gap-1 text-sm mt-2 ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section: Charts & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-6">Performance Trend</h2>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[120, 80, 160, 90, 140, 110, 180, 130, 150, 100, 170, 140].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <AnimatedBar height={h} color="from-red-600 to-red-400" delay={i * 50} width={12} />
                  <span className="text-[10px] text-gray-500">M{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center gap-4 p-3 hover:bg-zinc-800/50 rounded-xl transition-all">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.customer}</p>
                    <p className="text-xs text-gray-500 truncate">{t.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{t.amount}</p>
                    <p className={`text-[10px] uppercase font-bold ${t.status === 'completed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {t.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section: Goal Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Performance Score", val: 87, icon: <Award className="text-emerald-400" />, sub: "Excellent" },
            { label: "Goal Achievement", val: 73, icon: <Target className="text-blue-400" />, sub: "On Track" },
            { label: "System Health", val: 95, icon: <Zap className="text-purple-400" />, sub: "Optimal" },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-center">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-medium text-gray-300 mb-4">{item.label}</h3>
              <CircleProgress percentage={item.val} color="#dc2626" delay={i * 200} />
              <p className="mt-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{item.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;