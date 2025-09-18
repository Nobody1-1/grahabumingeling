"use client";
import { useMemo, useState } from "react";

function formatCurrency(idr: number) {
	return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Math.round(idr));
}

function amortizationPayment(principal: number, annualRatePct: number, years: number) {
	const n = Math.max(1, Math.round(years * 12));
	const r = (annualRatePct / 100) / 12;
	if (r === 0) return principal / n;
	return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function FixedCalculator() {
	const [hargaRumah, setHargaRumah] = useState<number>(500_000_000);
	const [dpPct, setDpPct] = useState<number>(20);
	const [tenorTahun, setTenorTahun] = useState<number>(15);
	const [bungaTahunan, setBungaTahunan] = useState<number>(7.5);

	const dp = useMemo(() => hargaRumah * (dpPct / 100), [hargaRumah, dpPct]);
	const pokokKredit = useMemo(() => Math.max(0, hargaRumah - dp), [hargaRumah, dp]);
	const angsuran = useMemo(() => amortizationPayment(pokokKredit, bungaTahunan, tenorTahun), [pokokKredit, bungaTahunan, tenorTahun]);
	const totalBayar = useMemo(() => angsuran * Math.round(tenorTahun * 12), [angsuran, tenorTahun]);
	const totalBunga = Math.max(0, totalBayar - pokokKredit);

	return (
		<div className="mt-4 space-y-4">
			<div className="grid grid-cols-2 gap-3">
				<label className="text-sm">Harga Rumah (IDR)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={hargaRumah} onChange={(e) => setHargaRumah(Number(e.target.value))} />
				</label>
				<label className="text-sm">DP (%)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={dpPct} onChange={(e) => setDpPct(Number(e.target.value))} />
				</label>
				<label className="text-sm">Tenor (tahun)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={tenorTahun} onChange={(e) => setTenorTahun(Number(e.target.value))} />
				</label>
				<label className="text-sm">Bunga Tetap/Tahun (%)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={bungaTahunan} onChange={(e) => setBungaTahunan(Number(e.target.value))} />
				</label>
			</div>

			<div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-4 text-sm">
				<p>Pokok Kredit: <span className="font-semibold">{formatCurrency(pokokKredit)}</span></p>
				<p>Estimasi Angsuran/Bulan: <span className="font-semibold">{formatCurrency(angsuran)}</span></p>
				<p>Total Bunga: <span className="font-semibold">{formatCurrency(totalBunga)}</span></p>
				<p>Total Pembayaran: <span className="font-semibold">{formatCurrency(totalBayar)}</span></p>
			</div>
		</div>
	);
}

function FloatingCalculator() {
	const [hargaRumah, setHargaRumah] = useState<number>(500_000_000);
	const [dpPct, setDpPct] = useState<number>(20);
	const [tenorTahun, setTenorTahun] = useState<number>(15);
	const [fixedYears, setFixedYears] = useState<number>(3);
	const [fixedRate, setFixedRate] = useState<number>(6.5);
	const [floatRate, setFloatRate] = useState<number>(10);

	const dp = useMemo(() => hargaRumah * (dpPct / 100), [hargaRumah, dpPct]);
	const pokokKredit = useMemo(() => Math.max(0, hargaRumah - dp), [hargaRumah, dp]);

	// Phase 1: fixed-rate period
	const fixedMonths = Math.min(Math.round(fixedYears * 12), Math.round(tenorTahun * 12));
	const totalMonths = Math.max(1, Math.round(tenorTahun * 12));
	const paymentFixed = amortizationPayment(pokokKredit, fixedRate, tenorTahun); // payment computed over full tenor but rate fixed
	const interestFixedMonthly = (fixedRate / 100) / 12;

	// Remaining principal after paying paymentFixed for fixedMonths with interestFixedMonthly
	function remainingPrincipalAfterMonths(P: number, r: number, payment: number, m: number) {
		if (r === 0) return Math.max(0, P - payment * m);
		// Using amortization remaining balance formula
		return P * Math.pow(1 + r, m) - payment * (Math.pow(1 + r, m) - 1) / r;
	}
	const remainingAfterFixed = useMemo(() => remainingPrincipalAfterMonths(pokokKredit, interestFixedMonthly, paymentFixed, fixedMonths), [pokokKredit, interestFixedMonthly, paymentFixed, fixedMonths]);

	// Phase 2: floating rate for the rest
	const remainingMonths = Math.max(0, totalMonths - fixedMonths);
	const paymentFloating = remainingMonths > 0 ? amortizationPayment(remainingAfterFixed, floatRate, remainingMonths / 12) : 0;

	const totalPaidFixed = paymentFixed * fixedMonths;
	const totalPaidFloating = paymentFloating * remainingMonths;
	const totalBayar = totalPaidFixed + totalPaidFloating;
	const totalBunga = Math.max(0, totalBayar - pokokKredit);

	return (
		<div className="mt-4 space-y-4">
			<div className="grid grid-cols-2 gap-3">
				<label className="text-sm">Harga Rumah (IDR)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={hargaRumah} onChange={(e) => setHargaRumah(Number(e.target.value))} />
				</label>
				<label className="text-sm">DP (%)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={dpPct} onChange={(e) => setDpPct(Number(e.target.value))} />
				</label>
				<label className="text-sm">Tenor (tahun)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={tenorTahun} onChange={(e) => setTenorTahun(Number(e.target.value))} />
				</label>
				<label className="text-sm">Masa Fixed (tahun)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={fixedYears} onChange={(e) => setFixedYears(Number(e.target.value))} />
				</label>
				<label className="text-sm">Bunga Fixed/Tahun (%)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={fixedRate} onChange={(e) => setFixedRate(Number(e.target.value))} />
				</label>
				<label className="text-sm">Bunga Floating/Tahun (%)
					<input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={floatRate} onChange={(e) => setFloatRate(Number(e.target.value))} />
				</label>
			</div>

			<div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-4 text-sm">
				<p>Pokok Kredit: <span className="font-semibold">{formatCurrency(pokokKredit)}</span></p>
				<p>Angsuran Fase Fixed/Bulan: <span className="font-semibold">{formatCurrency(paymentFixed)}</span> <span className="opacity-70">({fixedMonths} bln)</span></p>
				{remainingMonths > 0 ? (
					<p>Angsuran Fase Floating/Bulan: <span className="font-semibold">{formatCurrency(paymentFloating)}</span> <span className="opacity-70">({remainingMonths} bln)</span></p>
				) : (
					<p className="opacity-70">Tidak ada fase floating (masa fixed ≥ tenor)</p>
				)}
				<p>Total Bunga: <span className="font-semibold">{formatCurrency(totalBunga)}</span></p>
				<p>Total Pembayaran: <span className="font-semibold">{formatCurrency(totalBayar)}</span></p>
			</div>
		</div>
	);
}

export default function SimulasiKPRPage() {
	return (
		<section className="pt-28 px-4">
			<div className="mx-auto max-w-5xl">
				<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Simulasi Kredit Pemilikan Rumah (KPR)</h1>
				<p className="mt-2 text-black/70 dark:text-white/80">Hitung estimasi cicilan KPR Anda. Dukungan perhitungan Fixed Rate dan Floating (dua fase: fixed lalu floating).</p>

				<div className="mt-8 grid md:grid-cols-2 gap-6">
					<div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-black/20">
						<h2 className="font-semibold">Simulasi Fixed Rate</h2>
						<FixedCalculator />
					</div>
					<div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-black/20">
						<h2 className="font-semibold">Simulasi Floating (Dua Fase)</h2>
						<FloatingCalculator />
					</div>
				</div>
			</div>
		</section>
	);
}
