const ACHIEVEMENTS = [
  {
    id: "1",
    title: "Complete first course module",
    description: "Finish the first part of a course and unlock your beginner certificate.",
    status: "Completed",
    reward: "Certificate earned",
    progress: 100,
  },
  {
    id: "2",
    title: "Finish 3 courses",
    description: "Complete three full courses to earn the Learning Champion badge.",
    status: "In progress",
    reward: "Badge + certificate",
    progress: 65,
  },
  {
    id: "3",
    title: "Maintain a 7-day streak",
    description: "Study every day for a week to unlock the streak certificate.",
    status: "Locked",
    reward: "Streak certificate",
    progress: 20,
  },
];

export default function AchievementsPage() {
  return (
    <div className="p-6 md:p-8 bg-bg-main min-h-screen">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-display font-700 text-white mb-2">Achievements</h1>
          <p className="max-w-2xl text-sm text-gray-400">
            Progress through your courses and unlock certificates, badges, and special rewards for every milestone.
          </p>
        </div>
        <div className="rounded-3xl border border-bg-border bg-bg-card p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gray-500">Certificate progress</p>
          <p className="mt-2 text-lg font-semibold text-white">Complete a course part to earn one</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {ACHIEVEMENTS.map((achievement) => (
          <article key={achievement.id} className="rounded-3xl border border-bg-border bg-bg-card p-6 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{achievement.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{achievement.description}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${achievement.status === "Completed" ? "bg-emerald-500/15 text-emerald-300" : achievement.status === "In progress" ? "bg-cyan-500/15 text-cyan-300" : "bg-gray-700 text-gray-400"}`}>
                {achievement.status}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Reward</span>
                <span className="font-medium text-white">{achievement.reward}</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-bg-border">
                  <div className={`h-2 rounded-full ${achievement.progress === 100 ? "bg-accent-cyan" : "bg-accent-violet"}`} style={{ width: `${achievement.progress}%` }} />
                </div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  {achievement.progress}% complete
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-bg-border bg-bg-card p-6">
        <h2 className="text-xl font-semibold text-white">How certificates work</h2>
        <p className="mt-3 text-sm leading-6 text-gray-400">
          Complete each course section to receive a certificate for that part. Certificates appear here once the module is finished — perfect for sharing or tracking your progress.
        </p>
      </div>
    </div>
  );
}
