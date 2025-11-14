export function Footer() {
  return (
    <footer className="mt-12 pb-10 pt-12">
      <div className="mx-auto h-60 max-w-6xl bg-purple px-6 py-10 text-white sm:px-24 sm:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
              <span className="text-background-yellow">✶</span>
              lite-tech
            </div>
            <p className="mt-6 font-normal text-sm text-white">
              © Copyright Lite-Tech. All Rights Reserved
            </p>
          </div>
          <div className="flex items-center gap-6 text-xl font-semibold text-white">
            <a className="transition hover:text-background-yellow" href="#">
              in
            </a>
            <a className="transition hover:text-background-yellow" href="#">
              f
            </a>
            <a className="transition hover:text-background-yellow" href="#">
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
