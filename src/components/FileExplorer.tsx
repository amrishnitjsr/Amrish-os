import { useState } from 'react'

interface FileItem {
  name: string
  type: 'folder' | 'file'
  size?: string
  modified?: string
  icon: string
  children?: FileItem[]
}

const fileSystem: FileItem[] = [
  {
    name: 'Projects',
    type: 'folder',
    icon: '📁',
    modified: '2025-12-01',
    children: [
      { name: 'portfolio-os', type: 'folder', icon: '📂', modified: '2025-11-20' },
      { name: 'task-manager', type: 'folder', icon: '📂', modified: '2025-10-15' },
      { name: 'chat-app', type: 'folder', icon: '📂', modified: '2025-09-10' },
    ],
  },
  {
    name: 'Documents',
    type: 'folder',
    icon: '📁',
    modified: '2025-12-05',
    children: [
      { name: 'resume.pdf', type: 'file', icon: '📄', size: '256 KB', modified: '2025-12-05' },
      { name: 'cover_letter.docx', type: 'file', icon: '📝', size: '45 KB', modified: '2025-11-30' },
    ],
  },
  {
    name: 'Skills',
    type: 'folder',
    icon: '📁',
    modified: '2025-12-10',
    children: [
      { name: 'react.skill', type: 'file', icon: '⚛️', size: '95%', modified: '2025-12-10' },
      { name: 'typescript.skill', type: 'file', icon: '🔷', size: '88%', modified: '2025-12-08' },
      { name: 'nodejs.skill', type: 'file', icon: '🟢', size: '85%', modified: '2025-12-07' },
      { name: 'python.skill', type: 'file', icon: '🐍', size: '80%', modified: '2025-11-20' },
    ],
  },
  { name: 'about.exe', type: 'file', icon: '👤', size: '1 KB', modified: '2025-12-01' },
  { name: 'contact.bat', type: 'file', icon: '📧', size: '512 B', modified: '2025-11-15' },
  { name: 'readme.txt', type: 'file', icon: '📋', size: '2 KB', modified: '2025-10-01' },
]

function FileExplorer() {
  const [currentFolder, setCurrentFolder] = useState<FileItem[] | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['C:\\', 'Amrish-OS'])

  const openItem = (item: FileItem) => {
    if (item.type === 'folder' && item.children) {
      setCurrentFolder(item.children)
      setBreadcrumb(prev => [...prev, item.name])
    }
  }

  const goBack = () => {
    if (breadcrumb.length > 2) {
      setBreadcrumb(prev => prev.slice(0, -1))
      setCurrentFolder(null)
    }
  }

  const items = currentFolder ?? fileSystem

  return (
    <div className="file-explorer">
      <div className="fe-toolbar">
        <button className="fe-btn" onClick={goBack} disabled={breadcrumb.length <= 2}>◀ Back</button>
        <div className="fe-path">{breadcrumb.join(' \\ ')}</div>
      </div>
      <div className="fe-header-row">
        <span className="fe-col-name">Name</span>
        <span className="fe-col-type">Type</span>
        <span className="fe-col-size">Size</span>
        <span className="fe-col-date">Modified</span>
      </div>
      <div className="fe-body">
        {items.map((item, i) => (
          <div
            key={i}
            className={`fe-row ${item.type === 'folder' ? 'fe-row--folder' : 'fe-row--file'}`}
            onDoubleClick={() => openItem(item)}
          >
            <span className="fe-col-name">
              <span className="fe-icon">{item.icon}</span>
              {item.name}
            </span>
            <span className="fe-col-type">{item.type === 'folder' ? 'Folder' : 'File'}</span>
            <span className="fe-col-size">{item.size || '—'}</span>
            <span className="fe-col-date">{item.modified || '—'}</span>
          </div>
        ))}
      </div>
      <div className="fe-statusbar">{items.length} item(s) | Double-click to open</div>
    </div>
  )
}

export default FileExplorer
