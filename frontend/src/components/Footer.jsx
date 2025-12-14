export default function Footer() {
    return (
        <footer className="bg-primary-100 mt-20">
            <div className="section grid md:grid-cols-3 gap-6 text-sm">
                <div>
                    <h3 className="font-sweet text-primary-700 text-lg">Sweet Shop</h3>
                    <p className="text-neutral-600 mt-2">
                        Taste the tradition in every bite. Authentic Indian sweets.
                    </p>
                </div>

                <div className="flex gap-6 md:justify-center">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Contact</a>
                </div>

                <div className="text-neutral-500 md:text-right">
                    © 2025 Sweet Shop
                </div>
            </div>
        </footer>
    );
}
