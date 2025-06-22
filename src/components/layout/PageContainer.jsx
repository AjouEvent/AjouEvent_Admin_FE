export default function PageContainer({ children }) {
    return (
        <main className="p-4 sm:p-8 md:p-10 xl:p-16 w-full max-w-screen-lg md:max-w-screen-xl xl:max-w-screen-2xl mx-auto space-y-4">
            {children}
        </main>

    );
}