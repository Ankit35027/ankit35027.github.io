import { GITHUB_USERNAME, contactInfo, profileInfo } from '../data'

const PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`

const requestHeaders = {
  Accept: 'application/vnd.github+json',
}

function formatMemberSince(value) {
  if (!value) {
    return ''
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: requestHeaders })

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`)
  }

  return response.json()
}

function buildProfile(profile) {
  return {
    name: profile.name || profile.login || profileInfo.name,
    username: profile.login || profileInfo.username,
    avatar: profile.avatar_url || profileInfo.avatar,
    bio: profile.bio || profileInfo.bio,
    location: profile.location || profileInfo.location,
    publicRepos: profile.public_repos ?? 0,
    followers: profile.followers ?? 0,
    following: profile.following ?? 0,
    memberSince: formatMemberSince(profile.created_at),
  }
}

function buildContact(profile) {
  return {
    ...contactInfo,
    primaryUrl: profile.html_url || contactInfo.primaryUrl,
    github: profile.html_url || contactInfo.github,
    blog: profile.blog || '',
    email: profile.email || '',
  }
}

function normalizeRepo(repo) {
  const previewUrl = `https://opengraph.githubassets.com/1/${repo.full_name}`
  const tags = [repo.language, ...(repo.topics || []).slice(0, 2)].filter(Boolean)

  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'Public GitHub repository from Ankit35027.',
    image: previewUrl,
    tags: tags.length > 0 ? tags : ['GitHub'],
    github: repo.html_url,
    live: repo.homepage || '',
    stars: repo.stargazers_count ?? 0,
    updatedAt: repo.updated_at,
  }
}

export async function getGithubPortfolioData() {
  const [profile, repos] = await Promise.all([fetchJson(PROFILE_URL), fetchJson(REPOS_URL)])

  const featuredRepos = repos
    .filter((repo) => !repo.fork && repo.name !== `${GITHUB_USERNAME.toLowerCase()}.github.io`)
    .sort((left, right) => new Date(right.pushed_at) - new Date(left.pushed_at))
    .slice(0, 6)
    .map(normalizeRepo)

  return {
    profile: buildProfile(profile),
    contact: buildContact(profile),
    projects: featuredRepos,
  }
}
