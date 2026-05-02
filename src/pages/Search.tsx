import { useState, useEffect, useCallback } from "react";
import { getMeal, Meal } from "../services/api";
import { getSchool, SchoolInfo } from "../utils/storage";
import { getCurrentMonthRange, formatMealDate } from "../utils/date";
import { Search as SearchIcon, AlertCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Search = () => {
  const [school] = useState<SchoolInfo | null>(() => getSchool());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMeals = useCallback(async (schoolInfo: SchoolInfo) => {
    setLoading(true);
    setError(null);
    try {
      const { from, to } = getCurrentMonthRange();
      const data = await getMeal(
        schoolInfo.ATPT_OFCDC_SC_CODE,
        schoolInfo.SD_SCHUL_CODE,
        undefined,
        from,
        to
      );
      setMeals(data || []);
    } catch {
      setError("이번 달 급식 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (school) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchAllMeals(school);
    }
  }, [school, fetchAllMeals]);

  const filteredMeals = meals.filter((meal) => {
    if (!searchTerm) return false;
    return meal.DDISH_NM.includes(searchTerm);
  });

  if (!school) {
    return (
      <div className="page">
        <h2>메뉴 검색</h2>
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
      <h2>메뉴 검색</h2>
      <div className="search-container mb-6">
        <div className="input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="좋아하는 메뉴를 입력하세요 (예: 마라탕)"
            className="search-input"
          />
          <div className="search-icon-wrapper">
            <SearchIcon size={20} className="text-muted" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <p className="text-center text-muted">이번 달 식단을 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="card error-card">
          <p>{error}</p>
        </div>
      ) : searchTerm ? (
        <div className="results">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal, index) => (
              <div key={index} className="card meal-search-card">
                <div className="date-badge mb-2">
                  <Calendar size={14} />
                  <span>{formatMealDate(meal.MLSV_YMD)}</span>
                </div>
                <div className="meal-type small mb-2">{meal.MMEAL_SC_NM}</div>
                <div
                  className="meal-content"
                  dangerouslySetInnerHTML={{
                    __html: meal.DDISH_NM.replace(
                      new RegExp(searchTerm, "g"),
                      `<span class="highlight">${searchTerm}</span>`
                    ),
                  }}
                ></div>
              </div>
            ))
          ) : (
            <div className="card empty-state">
              <p className="text-muted text-center">"{searchTerm}"이(가) 포함된 메뉴를 찾을 수 없습니다.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="card info-card">
          <p className="text-muted text-center">
            이번 달 식단에서 먹고 싶은 메뉴가 <br />
            언제 나오는지 검색해보세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
