import { contactInfo as fallbackContact, profileInfo as fallbackProfile, skills as fallbackSkills } from '../data.js'

export default function Sidebar({ profile = fallbackProfile, contact = fallbackContact, skills = fallbackSkills }) {
  const socialLinks = [
    { label: 'GitHub', href: contact.github },
    { label: 'Website', href: contact.blog || contact.website },
  ].filter((link) => link.href)

  return (
    <aside className="sidebar">
      <img
        src={profile.avatar}
        alt="Profile"
        className="sidebar-avatar"
      />
      <h1 className="sidebar-name">{profile.name}</h1>
      <p className="sidebar-username">{profile.username}</p>
      <p className="sidebar-bio">
        {profile.bio}
      </p>

      <a
        href={contact.primaryUrl}
        target="_blank"
        rel="noreferrer"
        className="sidebar-follow-btn"
      >
        {contact.primaryLabel}
      </a>
      <div className="sidebar-socials">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="sidebar-social-btn"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="sidebar-info">
        {profile.location ? (
          <div className="sidebar-info-item">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
              <path d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span>{profile.location}</span>
          </div>
        ) : null}
        <div className="sidebar-info-item">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
          </svg>
          <span>{profile.publicRepos} public repositories</span>
        </div>
        <div className="sidebar-info-item">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
            <path d="M8 0a8 8 0 105.293 14.004c.401.074.547-.174.547-.386 0-.191-.007-.697-.011-1.368-2.153.468-2.608-1.037-2.608-1.037-.352-.894-.86-1.133-.86-1.133-.703-.48.053-.47.053-.47.777.055 1.185.798 1.185.798.69 1.184 1.81.842 2.251.644.07-.5.27-.842.49-1.035-1.719-.195-3.526-.86-3.526-3.827 0-.845.302-1.536.797-2.077-.08-.196-.346-.983.075-2.049 0 0 .65-.208 2.13.793A7.425 7.425 0 018 3.63a7.43 7.43 0 011.94.261c1.48-1 2.129-.793 2.129-.793.422 1.066.156 1.853.076 2.05.496.54.796 1.231.796 2.076 0 2.975-1.81 3.63-3.535 3.821.277.238.524.707.524 1.425 0 1.03-.009 1.86-.009 2.113 0 .214.145.463.552.384A8.001 8.001 0 008 0z" />
          </svg>
          <span>{profile.followers} followers · {profile.following} following</span>
        </div>
        {profile.memberSince ? (
          <div className="sidebar-info-item">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="#8b949e">
              <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h.25A2.75 2.75 0 0115 4.75v8.5A2.75 2.75 0 0112.25 16h-8.5A2.75 2.75 0 011 13.25v-8.5A2.75 2.75 0 013.75 2H4V.75A.75.75 0 014.75 0zM2.5 6.25v7a1.25 1.25 0 001.25 1.25h8.5a1.25 1.25 0 001.25-1.25v-7h-11zm11-1.5v-.5A1.25 1.25 0 0012.25 3.5h-8.5A1.25 1.25 0 002.5 4.75v.5h11z" />
            </svg>
            <span>GitHub member since {profile.memberSince}</span>
          </div>
        ) : null}
      </div>

      <div className="sidebar-achievements">
        <h3 className="sidebar-orgs-title">Achievements</h3>
        <div className="achievement-badges">
          <img
            src="https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png"
            alt="Pair Extraordinaire"
            className="achievement-badge"
            title="Pair Extraordinaire"
          />
          <img
            src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png"
            alt="Quickdraw"
            className="achievement-badge"
            title="Quickdraw"
          />
          <img
            src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png"
            alt="Pull Shark"
            className="achievement-badge"
            title="Pull Shark"
          />
        </div>
      </div>

      <div className="sidebar-orgs">
        <h3 className="sidebar-orgs-title">Skills</h3>
        <div className="sidebar-orgs-list">
          {skills.map((skill) => (
            <span key={skill} className="org-pill">{skill}</span>
          ))}
        </div>
      </div>


    </aside>
  )
}
