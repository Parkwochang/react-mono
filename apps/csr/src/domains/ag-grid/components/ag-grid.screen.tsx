import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
	AllCommunityModule,
	type ColDef,
	type GetRowIdParams,
	ModuleRegistry,
	type RowClickedEvent,
} from "ag-grid-community";
import type { CustomCellRendererProps } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";

import { cn } from "@/libs";
import { Input, Label, Textarea } from "@/shared/ui";

// ----------------------------------------------------------------------

let isAgGridRegistered = false;

if (!isAgGridRegistered) {
	ModuleRegistry.registerModules([AllCommunityModule]);
	isAgGridRegistered = true;
}

const STAGE_OPTIONS = ["Discovery", "Build", "QA", "Live"] as const;
const PRIORITY_OPTIONS = ["High", "Medium", "Low"] as const;

type DeliveryStage = (typeof STAGE_OPTIONS)[number];
type DeliveryPriority = (typeof PRIORITY_OPTIONS)[number];

type DeliveryRow = {
	id: string;
	service: string;
	owner: string;
	squad: string;
	stage: DeliveryStage;
	priority: DeliveryPriority;
	progress: number;
	tickets: number;
	updatedAt: string;
	summary: string;
};

const INITIAL_ROWS: DeliveryRow[] = [
	{
		id: "WB-101",
		service: "Membership Renewal",
		owner: "김서윤",
		squad: "Growth Ops",
		stage: "Live",
		priority: "High",
		progress: 96,
		tickets: 4,
		updatedAt: "04.13 10:20",
		summary:
			"자동 갱신 실패 케이스를 줄이기 위해 재시도 로직과 안내 문구를 정리하고 있습니다.",
	},
	{
		id: "WB-102",
		service: "Order Timeline",
		owner: "박지훈",
		squad: "Commerce Core",
		stage: "Build",
		priority: "High",
		progress: 62,
		tickets: 11,
		updatedAt: "04.13 09:45",
		summary: "주문 상세 화면에 배송 이벤트 히스토리를 추가하는 작업입니다.",
	},
	{
		id: "WB-103",
		service: "Vendor Portal",
		owner: "이하늘",
		squad: "Partner Tools",
		stage: "QA",
		priority: "Medium",
		progress: 81,
		tickets: 6,
		updatedAt: "04.12 18:30",
		summary: "정산 다운로드 포맷 검증과 권한 예외 케이스를 확인 중입니다.",
	},
	{
		id: "WB-104",
		service: "Promotion Studio",
		owner: "정도윤",
		squad: "Campaign",
		stage: "Discovery",
		priority: "Medium",
		progress: 24,
		tickets: 13,
		updatedAt: "04.12 16:05",
		summary: "프로모션 생성 플로우를 새 퍼널 기준으로 재설계하고 있습니다.",
	},
	{
		id: "WB-105",
		service: "Settlement Center",
		owner: "최유진",
		squad: "Finance Platform",
		stage: "Build",
		priority: "Low",
		progress: 48,
		tickets: 8,
		updatedAt: "04.11 14:40",
		summary: "월별 정산 집계 배치와 조회 API를 함께 정리하는 중입니다.",
	},
	{
		id: "WB-106",
		service: "Review Moderation",
		owner: "한민재",
		squad: "Trust & Safety",
		stage: "QA",
		priority: "High",
		progress: 74,
		tickets: 9,
		updatedAt: "04.11 11:10",
		summary: "운영자 검수 화면의 대량 승인 시나리오를 테스트하고 있습니다.",
	},
];

const DEFAULT_COL_DEF: ColDef<DeliveryRow> = {
	sortable: true,
	resizable: true,
	filter: true,
	floatingFilter: true,
	flex: 1,
	minWidth: 120,
};

const COLUMN_DEFS: ColDef<DeliveryRow>[] = [
	{
		field: "service",
		headerName: "Service",
		minWidth: 180,
		pinned: "left",
	},
	{
		field: "owner",
		headerName: "Owner",
		minWidth: 120,
	},
	{
		field: "squad",
		headerName: "Squad",
		minWidth: 150,
	},
	{
		field: "stage",
		headerName: "Stage",
		minWidth: 120,
		cellRenderer: StageCellRenderer,
	},
	{
		field: "priority",
		headerName: "Priority",
		minWidth: 120,
		cellRenderer: PriorityCellRenderer,
	},
	{
		field: "progress",
		headerName: "Progress",
		minWidth: 130,
		cellRenderer: ProgressCellRenderer,
	},
	{
		field: "tickets",
		headerName: "Tickets",
		minWidth: 110,
	},
	{
		field: "updatedAt",
		headerName: "Updated",
		minWidth: 120,
	},
];

export const AgGridScreen = () => {
	const editorRef = useRef<HTMLElement | null>(null);

	const [search, setSearch] = useState("");
	const [rows, setRows] = useState(INITIAL_ROWS);
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
	const [draft, setDraft] = useState<DeliveryRow | null>(null);

	const normalizedSearch = search.trim().toLowerCase();
	const filteredRows = rows.filter((row) => {
		if (!normalizedSearch) {
			return true;
		}

		return [
			row.id,
			row.service,
			row.owner,
			row.squad,
			row.stage,
			row.priority,
			row.summary,
		]
			.join(" ")
			.toLowerCase()
			.includes(normalizedSearch);
	});

	const liveCount = rows.filter((row) => row.stage === "Live").length;
	const activeCount = rows.filter(
		(row) => row.stage === "Build" || row.stage === "QA",
	).length;
	const averageProgress = rows.length
		? Math.round(rows.reduce((acc, row) => acc + row.progress, 0) / rows.length)
		: 0;

	const selectedRow = selectedRowId
		? (rows.find((row) => row.id === selectedRowId) ?? null)
		: null;
	const hasPendingChanges = Boolean(
		selectedRow &&
			draft &&
			JSON.stringify(selectedRow) !== JSON.stringify(draft),
	);

	const focusEditor = () => {
		requestAnimationFrame(() => {
			editorRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	};

	const selectRow = (row: DeliveryRow) => {
		setSelectedRowId(row.id);
		setDraft({ ...row });
		focusEditor();
	};

	const handleRowClick = (event: RowClickedEvent<DeliveryRow>) => {
		if (!event.data) {
			return;
		}

		selectRow(event.data);
	};

	const handleAddRow = () => {
		const nextIndex = rows.length + 1;
		const nextRow: DeliveryRow = {
			id: `WB-${100 + nextIndex}`,
			service: `New Flow ${nextIndex}`,
			owner: "담당자 미정",
			squad: "New Squad",
			stage: "Discovery",
			priority: "Medium",
			progress: 0,
			tickets: 1,
			updatedAt: formatUpdatedAt(),
			summary: "새 작업 설명을 입력해주세요.",
		};

		setRows((prev) => [nextRow, ...prev]);
		setSelectedRowId(nextRow.id);
		setDraft(nextRow);
		focusEditor();
	};

	const handleDraftChange = <TKey extends keyof DeliveryRow>(
		key: TKey,
		value: DeliveryRow[TKey],
	) => {
		setDraft((prev) => {
			if (!prev) {
				return prev;
			}

			return {
				...prev,
				[key]: value,
			};
		});
	};

	const handleCancel = () => {
		if (!selectedRow) {
			return;
		}

		setDraft({ ...selectedRow });
	};

	const handleCloseEditor = () => {
		setSelectedRowId(null);
		setDraft(null);
	};

	const handleSave = () => {
		if (!draft) {
			return;
		}

		const nextRow = {
			...draft,
			updatedAt: formatUpdatedAt(),
		};

		setRows((prev) =>
			prev.map((row) => (row.id === nextRow.id ? nextRow : row)),
		);
		setDraft(nextRow);
	};

	return (
		<div className="grid gap-6">
			<section className="rounded-[2rem] border border-emerald-300/15 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(3,7,18,0.92))] px-6 py-8 shadow-2xl shadow-emerald-950/20 sm:px-8">
				<p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
					AG Grid Demo
				</p>
				<h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
					로우를 누르면 같은 페이지 아래에서 바로 수정하는 AG Grid 샘플
					화면입니다.
				</h2>
				<p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
					이번 화면은 우측 폼 패널 대신 <code>그리드 아래 편집 섹션</code> 을
					사용합니다. 정렬, 컬럼 필터, 검색, 행 추가, 저장 반영까지 한 번에
					확인할 수 있게 구성했습니다.
				</p>

				<div className="mt-6 grid gap-3 md:grid-cols-3">
					<MetricCard
						label="Live Items"
						value={`${liveCount} rows`}
						description="운영 중인 작업 개수"
					/>
					<MetricCard
						label="Active Flow"
						value={`${activeCount} rows`}
						description="Build 또는 QA 진행 중"
					/>
					<MetricCard
						label="Average Progress"
						value={`${averageProgress}%`}
						description="전체 진행률 평균"
					/>
				</div>
			</section>

			<section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
							Workbench
						</p>
						<h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
							Delivery Board
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-400">
							행을 클릭하면 아래 편집 폼으로 이동합니다. AG Grid 기본
							정렬/필터도 같이 켜두었습니다.
						</p>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<Input
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="서비스, 담당자, 상태 검색"
							className="min-w-[16rem]"
						/>
						<button
							type="button"
							onClick={handleAddRow}
							className="rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
						>
							새 로우 추가
						</button>
					</div>
				</div>

				<div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10">
					<div className="ag-theme-quartz-dark ag-grid-workbench h-[520px] w-full">
						<AgGridReact
							rowData={filteredRows}
							columnDefs={COLUMN_DEFS}
							defaultColDef={DEFAULT_COL_DEF}
							getRowId={(params: GetRowIdParams<DeliveryRow>) => params.data.id}
							animateRows
							pagination
							paginationPageSize={5}
							rowHeight={60}
							headerHeight={46}
							suppressCellFocus
							rowClassRules={{
								"ag-grid-row-active": (params) =>
									params.data?.id === selectedRowId,
							}}
							onRowClicked={handleRowClick}
						/>
					</div>
				</div>
			</section>

			<section
				ref={editorRef}
				className="rounded-[2rem] border border-white/10 bg-black/20 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.28)] backdrop-blur sm:p-6"
			>
				<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
							Inline Screen Editor
						</p>
						<h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
							{draft ? draft.service : "편집할 로우를 선택해주세요"}
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-400">
							{draft
								? `${draft.id} / ${draft.owner} / ${draft.updatedAt}`
								: "그리드에서 로우를 클릭하면 아래 영역이 편집 모드로 채워집니다."}
						</p>
					</div>

					{draft && (
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={handleCancel}
								className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
							>
								변경 취소
							</button>
							<button
								type="button"
								onClick={handleCloseEditor}
								className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
							>
								닫기
							</button>
							<button
								type="button"
								onClick={handleSave}
								disabled={!hasPendingChanges}
								className="rounded-full bg-emerald-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-emerald-300/50 disabled:text-slate-500"
							>
								수정 저장
							</button>
						</div>
					)}
				</div>

				{draft ? (
					<div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
						<form
							className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5"
							onSubmit={(event) => {
								event.preventDefault();
								handleSave();
							}}
						>
							<div className="grid gap-5 sm:grid-cols-2">
								<Label>
									Service
									<Input
										value={draft.service}
										onChange={(event) =>
											handleDraftChange("service", event.target.value)
										}
										placeholder="서비스 이름"
									/>
								</Label>

								<Label>
									Owner
									<Input
										value={draft.owner}
										onChange={(event) =>
											handleDraftChange("owner", event.target.value)
										}
										placeholder="담당자 이름"
									/>
								</Label>
							</div>

							<div className="grid gap-5 sm:grid-cols-2">
								<Label>
									Squad
									<Input
										value={draft.squad}
										onChange={(event) =>
											handleDraftChange("squad", event.target.value)
										}
										placeholder="스쿼드명"
									/>
								</Label>

								<Label>
									Tickets
									<Input
										type="number"
										min={0}
										value={draft.tickets}
										onChange={(event) =>
											handleDraftChange(
												"tickets",
												Number(event.target.value || 0),
											)
										}
									/>
								</Label>
							</div>

							<Label>
								Summary
								<Textarea
									rows={5}
									value={draft.summary}
									onChange={(event) =>
										handleDraftChange("summary", event.target.value)
									}
									placeholder="작업 설명"
								/>
							</Label>

							<div className="grid gap-5 sm:grid-cols-2">
								<div className="grid gap-2">
									<span className="text-sm font-semibold text-slate-100">
										Stage
									</span>
									<div className="flex flex-wrap gap-2">
										{STAGE_OPTIONS.map((option) => (
											<OptionButton
												key={option}
												active={draft.stage === option}
												onClick={() => handleDraftChange("stage", option)}
											>
												{option}
											</OptionButton>
										))}
									</div>
								</div>

								<div className="grid gap-2">
									<span className="text-sm font-semibold text-slate-100">
										Priority
									</span>
									<div className="flex flex-wrap gap-2">
										{PRIORITY_OPTIONS.map((option) => (
											<OptionButton
												key={option}
												active={draft.priority === option}
												onClick={() => handleDraftChange("priority", option)}
											>
												{option}
											</OptionButton>
										))}
									</div>
								</div>
							</div>

							<Label>
								Progress
								<div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_7rem] sm:items-center">
									<input
										type="range"
										min={0}
										max={100}
										value={draft.progress}
										onChange={(event) =>
											handleDraftChange("progress", Number(event.target.value))
										}
										className="accent-emerald-300"
									/>
									<Input
										type="number"
										min={0}
										max={100}
										value={draft.progress}
										onChange={(event) =>
											handleDraftChange(
												"progress",
												clampProgress(Number(event.target.value || 0)),
											)
										}
									/>
								</div>
							</Label>
						</form>

						<aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
							<p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
								Preview
							</p>
							<div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
								<div className="flex items-start justify-between gap-3">
									<div>
										<p className="text-sm text-slate-400">{draft.id}</p>
										<h4 className="mt-2 text-xl font-semibold text-white">
											{draft.service}
										</h4>
									</div>
									<span
										className={cn(
											"ag-grid-pill",
											getStageToneClass(draft.stage),
										)}
									>
										{draft.stage}
									</span>
								</div>

								<div className="mt-4 grid gap-3 text-sm text-slate-300">
									<InfoRow label="Owner" value={draft.owner} />
									<InfoRow label="Squad" value={draft.squad} />
									<InfoRow label="Priority" value={draft.priority} />
									<InfoRow label="Tickets" value={`${draft.tickets} items`} />
									<InfoRow label="Progress" value={`${draft.progress}%`} />
								</div>

								<p className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-300">
									{draft.summary}
								</p>
							</div>

							<p className="mt-4 text-sm leading-6 text-slate-400">
								저장하면 그리드와 이 미리보기가 동시에 갱신됩니다. 샘플이라 서버
								연동 없이 화면 상태만 바로 바뀝니다.
							</p>
						</aside>
					</div>
				) : (
					<div className="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.03] px-5 py-10 text-center">
						<p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
							No Row Selected
						</p>
						<p className="mt-3 text-lg font-semibold text-white">
							그리드에서 수정할 로우를 먼저 선택해주세요.
						</p>
						<p className="mt-2 text-sm leading-6 text-slate-400">
							이번 샘플은 폼이 오른쪽에 붙지 않고, 같은 화면 아래에서 넓게
							편집하는 흐름을 보여주기 위한 예시입니다.
						</p>
					</div>
				)}
			</section>
		</div>
	);
};

function MetricCard({
	label,
	value,
	description,
}: {
	label: string;
	value: string;
	description: string;
}) {
	return (
		<article className="rounded-3xl border border-white/10 bg-black/20 p-5">
			<p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
				{label}
			</p>
			<p className="mt-3 text-3xl font-semibold text-white">{value}</p>
			<p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
		</article>
	);
}

function OptionButton({
	active,
	children,
	onClick,
}: {
	active: boolean;
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"rounded-full border px-4 py-2 text-sm font-semibold transition",
				active
					? "border-emerald-300/60 bg-emerald-300/10 text-white"
					: "border-white/10 text-slate-300 hover:border-white/20 hover:text-white",
			)}
		>
			{children}
		</button>
	);
}

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
			<span className="text-slate-400">{label}</span>
			<span className="font-medium text-white">{value}</span>
		</div>
	);
}

function StageCellRenderer({
	value,
}: CustomCellRendererProps<DeliveryRow, DeliveryStage>) {
	if (!value) {
		return null;
	}

	return (
		<span className={cn("ag-grid-pill", getStageToneClass(value))}>
			{value}
		</span>
	);
}

function PriorityCellRenderer({
	value,
}: CustomCellRendererProps<DeliveryRow, DeliveryPriority>) {
	if (!value) {
		return null;
	}

	return (
		<span className={cn("ag-grid-pill", getPriorityToneClass(value))}>
			{value}
		</span>
	);
}

function ProgressCellRenderer({
	value,
}: CustomCellRendererProps<DeliveryRow, number>) {
	const safeValue = typeof value === "number" ? clampProgress(value) : 0;

	return (
		<div className="flex items-center gap-3">
			<div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
				<div
					className="h-full rounded-full bg-emerald-300 transition-[width]"
					style={{ width: `${safeValue}%` }}
				/>
			</div>
			<span className="min-w-11 text-xs font-semibold text-slate-200">
				{safeValue}%
			</span>
		</div>
	);
}

function getStageToneClass(stage: DeliveryStage) {
	return {
		Discovery: "ag-grid-pill-stage-discovery",
		Build: "ag-grid-pill-stage-build",
		QA: "ag-grid-pill-stage-qa",
		Live: "ag-grid-pill-stage-live",
	}[stage];
}

function getPriorityToneClass(priority: DeliveryPriority) {
	return {
		High: "ag-grid-pill-priority-high",
		Medium: "ag-grid-pill-priority-medium",
		Low: "ag-grid-pill-priority-low",
	}[priority];
}

function clampProgress(value: number) {
	return Math.max(0, Math.min(100, value));
}

function formatUpdatedAt() {
	return new Intl.DateTimeFormat("ko-KR", {
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(new Date());
}
