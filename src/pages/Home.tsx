import { useState, useEffect, useCallback } from "react";
import { getMeal, type Meal } from "../services/api";
import { getSchool, type SchoolInfo } from "../utils/storage";
import { getTodayDate, formatMealDate } from "../utils/date";
import { Calendar, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [school] = useState<SchoolInfo | null>(() => getSchool());
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayMeal = useCallback(async (schoolInfo: SchoolInfo) => {
    setLoading(true);
    setError(null);
    try {
      const today = getTodayDate();
      const data = await getMeal(schoolInfo.ATPT_OFCDC_SC_CODE, schoolInfo.SD_SCHUL_CODE, today);
      if (data && data.length > 0) {
        setMeal(data[0]);
      } else {
        setMeal(null);
      }
    } catch {
      setError("급식 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (school) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchTodayMeal(school);
    }
  }, [school, fetchTodayMeal]);

  if (!school) {
    return (
      <div className="page">
        <h2>오늘의 급식</h2>
        <div className="card empty-state">
          <AlertCircle size={48} className="text-muted mb-4" />
          <h3>학교 정보가 없습니다</h3>
          <p className="text-muted mb-6">먼저 설정에서 학교를 검색하고 선택해주세요.</p>
          <Link to="/settings" className="btn btn-primary">
            학교 설정하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>오늘의 급식</h2>
        <button onClick={() => fetchTodayMeal(school)} className="btn-icon" disabled={loading}>
          <RefreshCw size={20} className={loading ? "spin" : ""} />
        </button>
      </div>

      <div className="date-badge">
        <Calendar size={16} />
        <span>{formatMealDate(getTodayDate())}</span>
      </div>

      <div className="card school-tag">
        <p>{school.SCHUL_NM}</p>
      </div>

      {loading ? (
        <div className="card loading-card">
          <div className="shimmer-line"></div>
          <div className="shimmer-line short"></div>
          <div className="shimmer-line"></div>
        </div>
      ) : error ? (
        <div className="card error-card">
          <p>{error}</p>
        </div>
      ) : meal ? (
        <div className="card meal-card">
          <div className="meal-type">{meal.MMEAL_SC_NM}</div>
          <div className="meal-content" dangerouslySetInnerHTML={{ __html: meal.DDISH_NM }}></div>
          <div className="meal-info">
            <div className="info-item">
              <span className="label">칼로리</span>
              <span className="value">{meal.CAL_INFO}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card empty-state">
          <p className="text-muted">오늘은 급식 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
