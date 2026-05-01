/**
 * Seed script: populates the local SQLite database with sample data for development.
 * Run with: npx tsx src/seed/index.ts
 */
import { getPayload } from '@/lib/payload/getPayload'

async function seed() {
  const payload = await getPayload()

  console.log('🌱 Seeding database...')

  // ── 1. Create admin user ───────────────────────────────────────────────────
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  let adminUser
  if (existingUsers.docs.length === 0) {
    adminUser = await payload.create({
      collection: 'users',
      data: {
        name: 'Solomon Atah',
        email: 'solomon@solomonatah.com',
        password: 'changeme123!',
        role: 'admin',
      },
    })
    console.log('✓ Admin user created — email: solomon@solomonatah.com / password: changeme123!')
  } else {
    console.log('· Users already exist, skipping.')
  }

  // ── 2. Create disciplines ─────────────────────────────────────────────────
  const disciplineData = [
    { name: 'Economics', slug: 'economics', icon: '📊', description: 'Political economy, development economics, trade, and macroeconomic policy.', order: 1 },
    { name: 'Law & Justice', slug: 'law', icon: '⚖️', description: 'Constitutional law, international law, human rights, and access to justice.', order: 2 },
    { name: 'Public Health', slug: 'public-health', icon: '🏥', description: 'Epidemiology, health systems, global health policy, and health equity.', order: 3 },
    { name: 'Philosophy', slug: 'philosophy', icon: '🧠', description: 'Ethics, political philosophy, African philosophy, and epistemology.', order: 4 },
    { name: 'History', slug: 'history', icon: '📜', description: 'Colonial history, intellectual history, social history, and memory studies.', order: 5 },
    { name: 'Political Science', slug: 'political-science', icon: '🌍', description: 'Comparative politics, international relations, democratization, and governance.', order: 6 },
    { name: 'Sociology', slug: 'sociology', icon: '🤝', description: 'Social inequality, migration, urban sociology, and collective action.', order: 7 },
    { name: 'Education', slug: 'education', icon: '🎓', description: 'Higher education, decolonization of curriculum, and education policy.', order: 8 },
    { name: 'Environmental Studies', slug: 'environment', icon: '🌱', description: 'Climate change, environmental justice, and sustainability in Africa.', order: 9 },
    { name: 'Gender Studies', slug: 'gender', icon: '♀', description: 'Feminist theory, gender and development, and reproductive rights.', order: 10 },
  ]

  const disciplines: Record<string, { id: string | number }> = {}
  for (const d of disciplineData) {
    const existing = await payload.find({ collection: 'disciplines', where: { slug: { equals: d.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'disciplines', data: d })
      disciplines[d.slug] = created
      console.log(`✓ Discipline: ${d.name}`)
    } else {
      disciplines[d.slug] = existing.docs[0]
    }
  }

  // ── 3. Create institutions ─────────────────────────────────────────────────
  const institutionData = [
    { name: 'University of Cape Town', slug: 'uct', shortName: 'UCT', country: 'South Africa', region: 'sub-saharan-africa', type: 'university' as const },
    { name: 'University of the Witwatersrand', slug: 'wits', shortName: 'WITS', country: 'South Africa', region: 'sub-saharan-africa', type: 'university' as const },
    { name: 'London School of Economics', slug: 'lse', shortName: 'LSE', country: 'United Kingdom', region: 'europe', type: 'university' as const },
    { name: 'Harvard University', slug: 'harvard', shortName: 'Harvard', country: 'United States', region: 'north-america', type: 'university' as const },
    { name: 'University of Ghana', slug: 'ug', shortName: 'UG', country: 'Ghana', region: 'sub-saharan-africa', type: 'university' as const },
  ]

  const institutions: Record<string, { id: string | number }> = {}
  for (const inst of institutionData) {
    const existing = await payload.find({ collection: 'institutions', where: { slug: { equals: inst.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'institutions', data: inst })
      institutions[inst.slug] = created
      console.log(`✓ Institution: ${inst.name}`)
    } else {
      institutions[inst.slug] = existing.docs[0]
    }
  }

  // ── 4. Create sample scholars ─────────────────────────────────────────────
  const scholarsData = [
    {
      name: 'Dr. Nolwazi Mkhwanazi',
      slug: 'dr-nolwazi-mkhwanazi',
      title: 'Professor of Anthropology',
      researchFocus: 'Medical anthropology, reproductive health, and the politics of care in South Africa. Her work examines how ideas about personhood, kinship, and technology intersect in fertility treatment.',
      institution: institutions['wits']?.id,
      disciplines: [disciplines['public-health']?.id, disciplines['sociology']?.id].filter(Boolean),
      country: 'South Africa',
      region: 'sub-saharan-africa' as const,
    },
    {
      name: 'Prof. Ndubisi Obiorah',
      slug: 'prof-ndubisi-obiorah',
      title: 'Associate Professor of International Law',
      researchFocus: 'Human rights law, international humanitarian law, and constitutionalism in West Africa. His recent work examines accountability mechanisms for economic and social rights.',
      institution: institutions['uct']?.id,
      disciplines: [disciplines['law']?.id].filter(Boolean),
      country: 'Nigeria',
      region: 'sub-saharan-africa' as const,
    },
    {
      name: 'Dr. Abena Asare',
      slug: 'dr-abena-asare',
      title: 'Senior Research Fellow',
      researchFocus: 'Economic history of West Africa, colonial taxation, and the long-run effects of extractive institutions. Currently completing a monograph on cocoa, credit, and the making of the Ghanaian peasantry.',
      institution: institutions['ug']?.id,
      disciplines: [disciplines['economics']?.id, disciplines['history']?.id].filter(Boolean),
      country: 'Ghana',
      region: 'sub-saharan-africa' as const,
    },
  ]

  const scholars: Record<string, { id: string | number }> = {}
  for (const s of scholarsData) {
    const existing = await payload.find({ collection: 'scholars', where: { slug: { equals: s.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'scholars', data: { ...s, disciplines: s.disciplines as (string | number)[] } })
      scholars[s.slug] = created
      console.log(`✓ Scholar: ${s.name}`)
    } else {
      scholars[s.slug] = existing.docs[0]
    }
  }

  // ── 5. Create sample conversations ───────────────────────────────────────
  const conversationsData = [
    {
      title: 'Reproductive Technology and the Politics of Care in South Africa',
      slug: 'mkhwanazi-reproductive-technology-care',
      youtubeId: 'dQw4w9WgXcQ', // Replace with real YouTube ID
      youtubeThumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: 4523, // ~75 minutes
      publishedAt: '2024-10-15',
      status: 'published' as const,
      featured: true,
      excerpt: 'Prof. Nolwazi Mkhwanazi on how reproductive technologies in South Africa force a reckoning with ideas of personhood, kinship, and the politics of who deserves to be cared for.',
      scholars: [scholars['dr-nolwazi-mkhwanazi']?.id].filter(Boolean),
      disciplines: [disciplines['public-health']?.id, disciplines['sociology']?.id].filter(Boolean),
      institutions: [institutions['wits']?.id].filter(Boolean),
      region: 'sub-saharan-africa' as const,
      timestamps: [
        { time: '00:00', label: 'Introduction' },
        { time: '08:12', label: 'What drew you to reproductive anthropology?' },
        { time: '21:34', label: 'IVF in South Africa — who has access and who does not?' },
        { time: '38:55', label: 'The politics of personhood' },
        { time: '55:20', label: 'What does care look like when the state withdraws?' },
      ],
      furtherReading: [
        { type: 'book' as const, title: 'Fertility, Reproductive Health and Policy in Africa', author: 'N. Mkhwanazi et al.', year: 2022, url: '' },
      ],
    },
    {
      title: 'Human Rights Accountability in Post-Conflict West Africa',
      slug: 'obiorah-human-rights-accountability-west-africa',
      youtubeId: 'dQw4w9WgXcQ',
      youtubeThumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: 3780,
      publishedAt: '2024-09-01',
      status: 'published' as const,
      featured: false,
      excerpt: 'Prof. Ndubisi Obiorah on accountability gaps in West African post-conflict transitions, and why the international human rights architecture struggles with economic and social rights violations.',
      scholars: [scholars['prof-ndubisi-obiorah']?.id].filter(Boolean),
      disciplines: [disciplines['law']?.id].filter(Boolean),
      institutions: [institutions['uct']?.id].filter(Boolean),
      region: 'sub-saharan-africa' as const,
      timestamps: [
        { time: '00:00', label: 'Introduction' },
        { time: '06:40', label: 'What is accountability in a post-conflict context?' },
        { time: '22:15', label: 'Why economic and social rights are treated differently' },
        { time: '44:00', label: 'The ECOWAS court and its limits' },
      ],
      furtherReading: [],
    },
    {
      title: 'Cocoa, Credit, and Colonial Extraction in Ghana',
      slug: 'asare-cocoa-credit-colonial-extraction-ghana',
      youtubeId: 'dQw4w9WgXcQ',
      youtubeThumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: 5040,
      publishedAt: '2024-08-12',
      status: 'published' as const,
      featured: false,
      excerpt: 'Dr. Abena Asare on the long economic history of cocoa farming in Ghana — how colonial taxation created debt traps that shaped West African political economy well into the post-independence period.',
      scholars: [scholars['dr-abena-asare']?.id].filter(Boolean),
      disciplines: [disciplines['economics']?.id, disciplines['history']?.id].filter(Boolean),
      institutions: [institutions['ug']?.id].filter(Boolean),
      region: 'sub-saharan-africa' as const,
      timestamps: [
        { time: '00:00', label: 'Introduction' },
        { time: '09:33', label: 'Why cocoa?' },
        { time: '27:10', label: 'Colonial taxation and debt' },
        { time: '51:45', label: 'What independence changed — and what it did not' },
      ],
      furtherReading: [
        { type: 'paper' as const, title: 'Credit, Cocoa, and Colonial Extraction', author: 'A. Asare', year: 2023, url: '' },
      ],
    },
  ]

  for (const conv of conversationsData) {
    const existing = await payload.find({ collection: 'conversations', where: { slug: { equals: conv.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'conversations',
        data: {
          ...conv,
          scholars: conv.scholars as (string | number)[],
          disciplines: conv.disciplines as (string | number)[],
          institutions: conv.institutions as (string | number)[],
        },
      })
      console.log(`✓ Conversation: ${conv.title}`)
    } else {
      console.log(`· Conversation already exists: ${conv.title}`)
    }
  }

  console.log('\n✅ Seed complete!')
  console.log('\nLocal admin: http://localhost:3000/admin')
  console.log('Email: solomon@solomonatah.com')
  console.log('Password: changeme123! (change immediately)')

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
