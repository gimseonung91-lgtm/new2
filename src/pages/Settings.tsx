import { useState } from "react";
import { searchSchool } from "../services/api";
import { saveSchool, getSchool, clearSchool, type SchoolInfo } from "../utils/storage";
import { Search, Trash2, Check, School } from "lucide-react";

interface SearchResult {
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  ORG_RDNMA: string;
}

const Settings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSchool, setCurrentSchool] = useState<SchoolInfo | null>(() => getSchool());

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    setLoading(true);
    try {
      const data = await searchSchool(searchTerm);
      setResults(data);
    } catch {
      // Error handling can be improved with a toast or error state
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (school: SearchResult) => {
    const info: SchoolInfo = {
      ATPT_OFCDC_SC_CODE: school.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: school.SD_SCHUL_CODE,
      SCHUL_NM: school.SCHUL_NM,
    };
    saveSchool(info);
    setCurrentSchool(info);
    setResults([]);
    setSearchTerm("");
  };

  const handleClear = () => {
    clearSchool();
    setCurrentSchool(null);
  };

  return (
    <div className="page">
      <h2>설정</h2>

      {currentSchool ? (
        <div className="card school-card">
          <div className="school-info-row">
            <div className="icon-bg">
              <School size={24} className="primary-text" />
            </div>
            <div>
              <h3>{currentSchool.SCHUL_NM}</h3>
              <p className="text-muted">학교가 설정되어 있습니다.</p>
            </div>
          </div>
          <button onClick={handleClear} className="btn btn-danger mt-4">
            <Trash2 size={18} />
            초기화
          </button>
        </div>
      ) : (
        <div className="card">
          <h3>학교 검색</h3>
          <p className="text-muted mb-4">자신의 학교를 검색하여 등록해주세요.</p>
          <form onSubmit={handleSearch} className="search-form">
            <div className="input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="학교 이름을 입력하세요"
                className="search-input"
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Search size={20} />
              </button>
            </div>
          </form>

          {loading && <p className="loading-text mt-4 text-center">검색 중...</p>}

          <div className="results mt-4">
            {results.map((school, index) => (
              <div key={index} className="result-item" onClick={() => handleSelect(school)}>
                <div className="result-info">
                  <div className="school-name">{school.SCHUL_NM}</div>
                  <div className="school-addr">{school.ORG_RDNMA}</div>
                </div>
                <Check size={18} className="check-icon primary-text" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
