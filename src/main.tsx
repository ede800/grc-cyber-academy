import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import './index.css'
import { ProgressProvider } from './lib/progress'
import { AuditCaseView, AuditList } from './views/AuditSimulator'
import { CareerAndTemplates } from './views/CareerAndTemplates'
import { ContractCaseView, ContractList } from './views/ContractRedliner'
import { Dashboard } from './views/Dashboard'
import { FrameworkMapper } from './views/FrameworkMapper'
import { ModuleDetail, ModulesList } from './views/Modules'
import { RiskDetail, RiskList } from './views/RiskStudio'
import { TprmCaseView, TprmList } from './views/TprmAssessor'

// HashRouter : un hébergement statique (GitHub Pages) ne sait pas rediriger les URL profondes.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/modules" element={<ModulesList />} />
            <Route path="/modules/:id" element={<ModuleDetail />} />
            <Route path="/contrats" element={<ContractList />} />
            <Route path="/contrats/:id" element={<ContractCaseView />} />
            <Route path="/tprm" element={<TprmList />} />
            <Route path="/tprm/:id" element={<TprmCaseView />} />
            <Route path="/risques" element={<RiskList />} />
            <Route path="/risques/:id" element={<RiskDetail />} />
            <Route path="/referentiels" element={<FrameworkMapper />} />
            <Route path="/audit" element={<AuditList />} />
            <Route path="/audit/:id" element={<AuditCaseView />} />
            <Route path="/livrables" element={<CareerAndTemplates />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ProgressProvider>
  </StrictMode>,
)
