import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Update CSS in <style>
const oldStickyCss = `			/* Sticky Columns on the Left (Checkbox, Grade, Code, LastName, FirstName) */
			.sticky-col-checkbox {
				position: sticky !important;
				left: 0px !important;
				width: 36px !important;
				min-width: 36px !important;
				max-width: 36px !important;
				text-align: center;
				box-sizing: border-box !important;
			}
			.sticky-col-grade {
				position: sticky !important;
				left: 36px !important;
				width: 60px !important;
				min-width: 60px !important;
				max-width: 60px !important;
				text-align: center;
				font-weight: 600;
				box-sizing: border-box !important;
			}
			.sticky-col-code {
				position: sticky !important;
				left: 96px !important;
				width: 75px !important;
				min-width: 75px !important;
				max-width: 75px !important;
				text-align: center;
				font-family: monospace;
				font-weight: 600;
				box-sizing: border-box !important;
			}
			.sticky-col-lastname {
				position: sticky !important;
				left: 171px !important;
				width: 125px !important;
				min-width: 125px !important;
				max-width: 125px !important;
				text-align: left;
				font-weight: 600;
				box-sizing: border-box !important;
			}
			.sticky-col-firstname {
				position: sticky !important;
				left: 296px !important;
				width: 95px !important;
				min-width: 95px !important;
				max-width: 95px !important;
				text-align: left;
				font-weight: 600;
				border-right: 2px solid #94a3b8 !important;
				box-shadow: 4px 0 8px -2px rgba(0,0,0,0.18);
				box-sizing: border-box !important;
			}
			/* Sticky Actions on the Right */
			.sticky-col-action {
				position: sticky !important;
				right: 0px !important;
				width: 115px !important;
				min-width: 115px !important;
				max-width: 115px !important;
				text-align: center;
				border-left: 2px solid #94a3b8 !important;
				box-shadow: -4px 0 8px -2px rgba(0,0,0,0.18);
				box-sizing: border-box !important;
			}
			/* Sticky Header styling */
			thead th.sticky-col-checkbox,
			thead th.sticky-col-grade,
			thead th.sticky-col-code,
			thead th.sticky-col-lastname,
			thead th.sticky-col-firstname,
			thead th.sticky-col-action {
				position: sticky !important;
				background-color: #f8fafc !important;
				z-index: 25 !important;
			}
			/* Sticky Body Cell styling */
			tbody td.sticky-col-checkbox,
			tbody td.sticky-col-grade,
			tbody td.sticky-col-code,
			tbody td.sticky-col-lastname,
			tbody td.sticky-col-firstname,
			tbody td.sticky-col-action {
				position: sticky !important;
				background-color: #ffffff !important;
				z-index: 5 !important;
			}
			/* Hover and Selection background preservation for sticky cells */
			tbody tr:hover td.sticky-col-checkbox,
			tbody tr:hover td.sticky-col-grade,
			tbody tr:hover td.sticky-col-code,
			tbody tr:hover td.sticky-col-lastname,
			tbody tr:hover td.sticky-col-firstname,
			tbody tr:hover td.sticky-col-action {
				background-color: #f1f5f9 !important;
			}
			tbody tr.selected td.sticky-col-checkbox,
			tbody tr.selected td.sticky-col-grade,
			tbody tr.selected td.sticky-col-code,
			tbody tr.selected td.sticky-col-lastname,
			tbody tr.selected td.sticky-col-firstname,
			tbody tr.selected td.sticky-col-action {
				background-color: #eff6ff !important;
			}
			body.inline-edit-mode .editable-cell.sticky-col-grade,
			body.inline-edit-mode .editable-cell.sticky-col-code,
			body.inline-edit-mode .editable-cell.sticky-col-lastname,
			body.inline-edit-mode .editable-cell.sticky-col-firstname {
				background-color: #fffbeb !important;
			}`;

const newStickyCss = `			/* Sticky Columns on the Left (Checkbox, Index No, Grade, Code, LastName, FirstName) */
			.sticky-col-checkbox {
				position: sticky !important;
				left: 0px !important;
				width: 34px !important;
				min-width: 34px !important;
				max-width: 34px !important;
				text-align: center;
				box-sizing: border-box !important;
			}
			.sticky-col-index {
				position: sticky !important;
				left: 34px !important;
				width: 36px !important;
				min-width: 36px !important;
				max-width: 36px !important;
				text-align: center;
				font-weight: 700;
				color: #475569;
				font-size: 0.775rem;
				box-sizing: border-box !important;
			}
			.sticky-col-grade {
				position: sticky !important;
				left: 70px !important;
				width: 58px !important;
				min-width: 58px !important;
				max-width: 58px !important;
				text-align: center;
				font-weight: 700;
				color: #1e40af;
				box-sizing: border-box !important;
			}
			.sticky-col-code {
				position: sticky !important;
				left: 128px !important;
				width: 76px !important;
				min-width: 76px !important;
				max-width: 76px !important;
				text-align: center;
				font-family: monospace;
				font-weight: 700;
				color: #0f172a;
				box-sizing: border-box !important;
			}
			.sticky-col-lastname {
				position: sticky !important;
				left: 204px !important;
				width: 120px !important;
				min-width: 120px !important;
				max-width: 120px !important;
				text-align: left;
				font-weight: 600;
				box-sizing: border-box !important;
			}
			.sticky-col-firstname {
				position: sticky !important;
				left: 324px !important;
				width: 95px !important;
				min-width: 95px !important;
				max-width: 95px !important;
				text-align: left;
				font-weight: 600;
				border-right: 2px solid #94a3b8 !important;
				box-shadow: 4px 0 8px -2px rgba(0,0,0,0.18);
				box-sizing: border-box !important;
			}
			/* Sticky Actions on the Right */
			.sticky-col-action {
				position: sticky !important;
				right: 0px !important;
				width: 110px !important;
				min-width: 110px !important;
				max-width: 110px !important;
				text-align: center;
				border-left: 2px solid #94a3b8 !important;
				box-shadow: -4px 0 8px -2px rgba(0,0,0,0.18);
				box-sizing: border-box !important;
			}
			/* Sticky Header styling */
			thead th.sticky-col-checkbox,
			thead th.sticky-col-index,
			thead th.sticky-col-grade,
			thead th.sticky-col-code,
			thead th.sticky-col-lastname,
			thead th.sticky-col-firstname,
			thead th.sticky-col-action {
				position: sticky !important;
				background-color: #f8fafc !important;
				z-index: 25 !important;
			}
			/* Sticky Body Cell styling */
			tbody td.sticky-col-checkbox,
			tbody td.sticky-col-index,
			tbody td.sticky-col-grade,
			tbody td.sticky-col-code,
			tbody td.sticky-col-lastname,
			tbody td.sticky-col-firstname,
			tbody td.sticky-col-action {
				position: sticky !important;
				background-color: #ffffff !important;
				z-index: 5 !important;
			}
			/* Hover and Selection background preservation for sticky cells */
			tbody tr:hover td.sticky-col-checkbox,
			tbody tr:hover td.sticky-col-index,
			tbody tr:hover td.sticky-col-grade,
			tbody tr:hover td.sticky-col-code,
			tbody tr:hover td.sticky-col-lastname,
			tbody tr:hover td.sticky-col-firstname,
			tbody tr:hover td.sticky-col-action {
				background-color: #f1f5f9 !important;
			}
			tbody tr.selected td.sticky-col-checkbox,
			tbody tr.selected td.sticky-col-index,
			tbody tr.selected td.sticky-col-grade,
			tbody tr.selected td.sticky-col-code,
			tbody tr.selected td.sticky-col-lastname,
			tbody tr.selected td.sticky-col-firstname,
			tbody tr.selected td.sticky-col-action {
				background-color: #eff6ff !important;
			}
			body.inline-edit-mode .editable-cell.sticky-col-grade,
			body.inline-edit-mode .editable-cell.sticky-col-code,
			body.inline-edit-mode .editable-cell.sticky-col-lastname,
			body.inline-edit-mode .editable-cell.sticky-col-firstname {
				background-color: #fffbeb !important;
			}
			/* Sortable Headers */
			th.sortable-th {
				cursor: pointer;
				user-select: none;
				transition: background-color 0.15s;
			}
			th.sortable-th:hover {
				background-color: #e2e8f0 !important;
			}
			.sort-arrow {
				font-size: 0.65rem;
				margin-left: 2px;
				color: #2563eb;
				display: inline-block;
			}
			/* Quick Edit cell indicator for Grade & Code */
			.cell-kae-wrap {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 3px;
				cursor: pointer;
				position: relative;
			}
			.cell-kae-indicator {
				font-size: 0.65rem;
				color: #94a3b8;
				opacity: 0.55;
				transition: all 0.15s ease;
			}
			.cell-kae-wrap:hover .cell-kae-indicator {
				color: #2563eb;
				opacity: 1;
				transform: scale(1.15);
			}
			/* Mobile responsive sticky layout - prevents overlapping in screenshot */
			@media (max-width: 768px) {
				.sticky-col-checkbox {
					left: 0px !important;
					width: 30px !important;
					min-width: 30px !important;
				}
				.sticky-col-index {
					left: 30px !important;
					width: 32px !important;
					min-width: 32px !important;
					font-size: 0.7rem;
				}
				.sticky-col-grade {
					left: 62px !important;
					width: 48px !important;
					min-width: 48px !important;
				}
				.sticky-col-code {
					left: 110px !important;
					width: 70px !important;
					min-width: 70px !important;
					border-right: 2px solid #94a3b8 !important;
					box-shadow: 3px 0 6px -2px rgba(0,0,0,0.18);
				}
				.sticky-col-lastname,
				.sticky-col-firstname {
					position: static !important;
					border-right: none !important;
					box-shadow: none !important;
				}
				thead th.sticky-col-lastname,
				thead th.sticky-col-firstname {
					position: static !important;
				}
				.sticky-col-action {
					position: sticky !important;
					right: 0px !important;
					width: 95px !important;
					min-width: 95px !important;
					z-index: 12 !important;
				}
			}`;

if (html.includes(oldStickyCss)) {
	html = html.replace(oldStickyCss, newStickyCss);
	console.log('✓ Successfully replaced sticky column CSS');
} else {
	console.warn('⚠️ Could not find exact oldStickyCss block');
}

// 2. Add Sort dropdown to search-wrap
const oldSearchWrap = `<select id="grade-filter" class="select-compact" title="ចម្រាញ់តាមថ្នាក់">
					<option value="">គ្រប់ថ្នាក់</option>
				</select>`;

const newSearchWrap = `<select id="grade-filter" class="select-compact" title="ចម្រាញ់តាមថ្នាក់">
					<option value="">គ្រប់ថ្នាក់</option>
				</select>
				<select id="table-sort-select" class="select-compact" title="តម្រៀបទិន្នន័យសិស្ស (Sort)">
					<option value="code-asc">🔢 អត្តលេខ (២៧០០១...)</option>
					<option value="code-desc">🔢 អត្តលេខ (ចុះក្រោម)</option>
					<option value="grade-code">🏫 ថ្នាក់ទី + អត្តលេខ</option>
					<option value="girls-first">👧 ស្រីមុន + អត្តលេខ</option>
					<option value="boys-first">👦 ប្រុសមុន + អត្តលេខ</option>
					<option value="name-asc">🔤 គោត្តនាម-នាម (ក-អ)</option>
				</select>`;

if (html.includes(oldSearchWrap)) {
	html = html.replace(oldSearchWrap, newSearchWrap);
	console.log('✓ Successfully added table-sort-select');
} else {
	console.warn('⚠️ Could not find oldSearchWrap');
}

// 3. Update Batch Bar with Renumbering feature
const oldBatchActions = `<button id="batch-assign-grade-btn" class="btn-text" style="background: #22c55e; color: white;" title="ផ្លាស់ប្ដូរថ្នាក់សិស្សដែលបានជ្រើសរើស">
					🎒 ផ្លាស់ប្ដូរថ្នាក់
				</button>`;

const newBatchActions = `<button id="batch-assign-grade-btn" class="btn-text" style="background: #22c55e; color: white;" title="ផ្លាស់ប្ដូរថ្នាក់សិស្សដែលបានជ្រើសរើស">
					🎒 ផ្លាស់ប្ដូរថ្នាក់
				</button>
				<span style="opacity: 0.4;">|</span>
				<label for="batch-start-code" style="font-weight: 600;">កែអត្តលេខរៀង៖</label>
				<input type="text" id="batch-start-code" placeholder="ឧ. 27001" style="padding: 0.2rem 0.4rem; border-radius: 4px; border: none; font-size: 0.8rem; width: 75px;" />
				<button id="batch-renumber-btn" class="btn-text" style="background: #0284c7; color: white;" title="រៀបចំអត្តលេខរៀងឡើងវិញជាលំដាប់ (27001, 27002, 27003...)">
					🔢 រៀបអត្តលេខរៀង
				</button>`;

if (html.includes(oldBatchActions)) {
	html = html.replace(oldBatchActions, newBatchActions);
	console.log('✓ Successfully added batch renumbering');
} else {
	console.warn('⚠️ Could not find oldBatchActions');
}

// 4. Add Quick Edit Modal HTML
const modalInsertionTarget = `<!-- Student Edit / Create Modal -->`;
const quickEditModalHtml = `<!-- Quick Edit Grade & Student Code Modal (កែប្រែ ថ្នាក់ទី & អត្តលេខ) -->
		<div id="quick-edit-modal" class="modal-overlay hidden">
			<div class="modal-card" style="max-width: 380px; height: auto;">
				<div class="modal-header">
					<h3>✏️ កែប្រែ ថ្នាក់ទី & អត្តលេខ</h3>
					<button id="quick-edit-close" class="close-btn">&times;</button>
				</div>
				<form id="quick-edit-form">
					<div class="modal-body" style="gap: 0.75rem;">
						<input type="hidden" id="qe-student-id" value="" />
						<div style="background: #f0f9ff; padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid #bae6fd; font-size: 0.8rem;">
							<span style="color: #64748b;">សិស្ស៖</span>
							<strong id="qe-student-name" style="color: #0369a1;">-</strong>
						</div>
						<div class="form-field">
							<label for="qe-grade">ថ្នាក់ទី (Grade) *</label>
							<input type="text" id="qe-grade" placeholder="ឧ. 3A, 4B" required style="font-weight: 700; color: #1e40af;" />
						</div>
						<div class="form-field">
							<label for="qe-code">អត្តលេខសិស្ស (Student Code) *</label>
							<input type="text" id="qe-code" placeholder="ឧ. 27001" required style="font-family: monospace; font-weight: 700; font-size: 0.9rem;" />
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" id="qe-cancel-btn" class="btn-text" style="background: #e2e8f0; color: #0f172a;">បោះបង់</button>
						<button type="submit" id="qe-save-btn" class="btn-text" style="background: #1e40af; color: white;">💾 រក្សាទុក</button>
					</div>
				</form>
			</div>
		</div>

		`;

if (html.includes(modalInsertionTarget) && !html.includes('id="quick-edit-modal"')) {
	html = html.replace(modalInsertionTarget, quickEditModalHtml + modalInsertionTarget);
	console.log('✓ Successfully inserted quick-edit-modal');
}

// 5. Update JavaScript: Headers with indexTh and sortable headers
const oldHeaderSetup = `			// 1. Checkbox Col (Left frozen 1)
			const selectAllTh = document.createElement("th");
			selectAllTh.rowSpan = 2;
			selectAllTh.className = "sticky-col-checkbox";
			selectAllTh.innerHTML = '<input type="checkbox" id="select-all-students" title="ជ្រើសរើសទាំងអស់" style="cursor: pointer;" />';
			groupHeader.appendChild(selectAllTh);

			// 2. Frozen Identity Columns: ថ្នាក់ទី, អត្តលេខ, គោត្តនាម *, នាម * (Left frozen 2 to 5)
			const frozenColDefs = [
				{ text: "ថ្នាក់ទី", className: "sticky-col-grade", title: "ថ្នាក់ទី (Grade)" },
				{ text: "អត្តលេខ", className: "sticky-col-code", title: "អត្តលេខសិស្ស (Student Code)" },
				{ text: "គោត្តនាម *", className: "sticky-col-lastname", title: "គោត្តនាម (Last Name)" },
				{ text: "នាម *", className: "sticky-col-firstname", title: "នាម (First Name)" },
			];

			for (const fc of frozenColDefs) {
				const fTh = document.createElement("th");
				fTh.rowSpan = 2;
				fTh.className = fc.className;
				fTh.textContent = fc.text;
				fTh.title = fc.title;
				groupHeader.appendChild(fTh);
			}`;

const newHeaderSetup = `			// Sorting state
			let currentSortMode = "code-asc";

			function sortStudentDocs(docs) {
				const sortSelect = document.getElementById("table-sort-select");
				const sortVal = sortSelect ? sortSelect.value : currentSortMode;
				return [...docs].sort((a, b) => {
					const aVals = a.values || [];
					const bVals = b.values || [];
					const aGrade = String(a.grade || aVals[0] || "").trim();
					const bGrade = String(b.grade || bVals[0] || "").trim();
					const aCodeRaw = String(a.studentCode || aVals[1] || "").trim();
					const bCodeRaw = String(b.studentCode || bVals[1] || "").trim();
					const aNum = parseInt(aCodeRaw.replace(/\\D/g, ""), 10);
					const bNum = parseInt(bCodeRaw.replace(/\\D/g, ""), 10);
					const aGender = String(a.gender || aVals[4] || "").trim();
					const bGender = String(b.gender || bVals[4] || "").trim();
					const aIsGirl = aGender.includes("ស្រី") || aGender.toLowerCase().includes("female");
					const bIsGirl = bGender.includes("ស្រី") || bGender.toLowerCase().includes("female");
					const aLast = String(a.lastName || aVals[2] || "").trim();
					const aFirst = String(a.firstName || aVals[3] || "").trim();
					const bLast = String(b.lastName || bVals[2] || "").trim();
					const bFirst = String(b.firstName || bVals[3] || "").trim();
					const aName = \`\${aLast} \${aFirst}\`.trim();
					const bName = \`\${bLast} \${bFirst}\`.trim();

					if (sortVal === "code-asc") {
						if (!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum) return aNum - bNum;
						return aCodeRaw.localeCompare(bCodeRaw, undefined, { numeric: true });
					} else if (sortVal === "code-desc") {
						if (!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum) return bNum - aNum;
						return bCodeRaw.localeCompare(aCodeRaw, undefined, { numeric: true });
					} else if (sortVal === "grade-code") {
						const gradeDiff = aGrade.localeCompare(bGrade, undefined, { numeric: true });
						if (gradeDiff !== 0) return gradeDiff;
						if (!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum) return aNum - bNum;
						return aCodeRaw.localeCompare(bCodeRaw, undefined, { numeric: true });
					} else if (sortVal === "girls-first") {
						if (aIsGirl !== bIsGirl) return aIsGirl ? -1 : 1;
						if (!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum) return aNum - bNum;
						return aCodeRaw.localeCompare(bCodeRaw, undefined, { numeric: true });
					} else if (sortVal === "boys-first") {
						if (aIsGirl !== bIsGirl) return aIsGirl ? 1 : -1;
						if (!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum) return aNum - bNum;
						return aCodeRaw.localeCompare(bCodeRaw, undefined, { numeric: true });
					} else if (sortVal === "name-asc") {
						return aName.localeCompare(bName, 'km');
					}
					return 0;
				});
			}

			// 1. Checkbox Col (Left frozen 1)
			const selectAllTh = document.createElement("th");
			selectAllTh.rowSpan = 2;
			selectAllTh.className = "sticky-col-checkbox";
			selectAllTh.innerHTML = '<input type="checkbox" id="select-all-students" title="ជ្រើសរើសទាំងអស់" style="cursor: pointer;" />';
			groupHeader.appendChild(selectAllTh);

			// 1.1 Index Col (ល.រ - Left frozen 2)
			const indexTh = document.createElement("th");
			indexTh.rowSpan = 2;
			indexTh.className = "sticky-col-index sortable-th";
			indexTh.textContent = "ល.រ";
			indexTh.title = "លេខរៀង (ចុចដើម្បីតម្រៀបឡើងវិញ)";
			indexTh.onclick = () => {
				const sortSelect = document.getElementById("table-sort-select");
				if (sortSelect) {
					sortSelect.value = "code-asc";
					currentSortMode = "code-asc";
					renderTable(studentDocs);
				}
			};
			groupHeader.appendChild(indexTh);

			// 2. Frozen Identity Columns: ថ្នាក់ទី, អត្តលេខ, គោត្តនាម *, នាម * (Left frozen 3 to 6)
			const frozenColDefs = [
				{ key: "grade", text: "ថ្នាក់ទី", className: "sticky-col-grade sortable-th", title: "ថ្នាក់ទី (ចុចដើម្បីតម្រៀប / Click to sort)" },
				{ key: "code", text: "អត្តលេខ", className: "sticky-col-code sortable-th", title: "អត្តលេខសិស្ស (ចុចដើម្បីតម្រៀប / Click to sort)" },
				{ key: "name", text: "គោត្តនាម *", className: "sticky-col-lastname sortable-th", title: "គោត្តនាម (ចុចដើម្បីតម្រៀប / Click to sort)" },
				{ key: "firstname", text: "នាម *", className: "sticky-col-firstname sortable-th", title: "នាម (First Name)" },
			];

			for (const fc of frozenColDefs) {
				const fTh = document.createElement("th");
				fTh.rowSpan = 2;
				fTh.className = fc.className;
				fTh.dataset.colKey = fc.key;
				fTh.title = fc.title;
				
				const headerSpan = document.createElement("span");
				headerSpan.textContent = fc.text;
				fTh.appendChild(headerSpan);

				const arrowSpan = document.createElement("span");
				arrowSpan.className = "sort-arrow";
				fTh.appendChild(arrowSpan);

				fTh.onclick = () => {
					const sortSelect = document.getElementById("table-sort-select");
					if (fc.key === "code") {
						currentSortMode = currentSortMode === "code-asc" ? "code-desc" : "code-asc";
					} else if (fc.key === "grade") {
						currentSortMode = currentSortMode === "grade-code" ? "code-asc" : "grade-code";
					} else if (fc.key === "name") {
						currentSortMode = currentSortMode === "name-asc" ? "code-asc" : "name-asc";
					}
					if (sortSelect) sortSelect.value = currentSortMode;
					renderTable(studentDocs);
				};
				groupHeader.appendChild(fTh);
			}`;

if (html.includes(oldHeaderSetup)) {
	html = html.replace(oldHeaderSetup, newHeaderSetup);
	console.log('✓ Successfully replaced header setup with sortable headers');
} else {
	console.warn('⚠️ Could not find oldHeaderSetup');
}

// 6. Update renderTable loop
const oldRenderTableStart = `			function renderTable(docs) {
				studentTbody.innerHTML = "";
				document.getElementById("student-count-display").textContent = docs.length;

				// Populate Grade Filter and Report Grade Select
				const gradeSet = new Set();
				for (const d of docs) {
					const g = d.grade || (d.values ? d.values[0] : "");
					if (g) gradeSet.add(g);
				}
				const gradeFilter = document.getElementById("grade-filter");
				const reportGradeSelect = document.getElementById("report-grade-select");
				const curGrade = gradeFilter.value;

				gradeFilter.innerHTML = '<option value="">គ្រប់ថ្នាក់</option>';
				reportGradeSelect.innerHTML = '<option value="">គ្រប់ថ្នាក់ទាំងអស់</option>';

				for (const g of Array.from(gradeSet).sort()) {
					const opt1 = document.createElement("option");
					opt1.value = g;
					opt1.textContent = "ថ្នាក់ " + g;
					if (g === curGrade) opt1.selected = true;
					gradeFilter.appendChild(opt1);

					const opt2 = document.createElement("option");
					opt2.value = g;
					opt2.textContent = "ថ្នាក់ " + g;
					reportGradeSelect.appendChild(opt2);
				}

				if (docs.length === 0) {
					const tr = document.createElement("tr");
					const td = document.createElement("td");
					td.colSpan = 73;
					td.style.padding = "2.5rem";
					td.style.textAlign = "center";
					td.style.color = "var(--text-muted)";
					td.textContent = "មិនមានទិន្នន័យសិស្សនៅឡើយទេ។ ចុច «➕» ដើម្បីបន្ថែម ឬ «📥» នាំចូល XLSX។";
					tr.appendChild(td);
					studentTbody.appendChild(tr);
					return;
				}

				for (const docItem of docs) {
					const tr = document.createElement("tr");
					tr.dataset.id = docItem.id;
					if (selectedStudentIds.has(docItem.id)) tr.classList.add("selected");

					// Col 1: Checkbox (Left frozen 1)
					const checkTd = document.createElement("td");
					checkTd.className = "sticky-col-checkbox";
					const box = document.createElement("input");
					box.type = "checkbox";
					box.className = "row-checkbox";
					box.checked = selectedStudentIds.has(docItem.id);
					box.onchange = (e) => {
						if (e.target.checked) selectedStudentIds.add(docItem.id);
						else selectedStudentIds.delete(docItem.id);
						tr.classList.toggle("selected", e.target.checked);
						updateBatchBar();
					};
					checkTd.appendChild(box);
					tr.appendChild(checkTd);

					// 71 Data Values (In-line Editable)
					// Frozen on left: i=0 (Grade), i=1 (Code), i=2 (LastName), i=3 (FirstName)
					// Horizontal scroll starts from: i=4 (Gender / ភេទ *)
					const vals = docItem.values || [];
					for (let i = 0; i < 71; i++) {
						const cell = document.createElement("td");
						cell.className = "editable-cell";
						const textVal = vals[i] ?? "";

						// Assign frozen left column classes for first 4 fields
						if (i === 0) cell.classList.add("sticky-col-grade");
						else if (i === 1) cell.classList.add("sticky-col-code");
						else if (i === 2) cell.classList.add("sticky-col-lastname");
						else if (i === 3) cell.classList.add("sticky-col-firstname");`;

const newRenderTableStart = `			function renderTable(rawDocs) {
				studentTbody.innerHTML = "";
				// Sort documents according to selected sort mode
				const docs = sortStudentDocs(rawDocs);
				document.getElementById("student-count-display").textContent = docs.length;

				// Update header sort indicator arrows
				const sortVal = document.getElementById("table-sort-select")?.value || currentSortMode;
				document.querySelectorAll("th.sortable-th").forEach(th => {
					const arrow = th.querySelector(".sort-arrow");
					if (!arrow) return;
					const key = th.dataset.colKey;
					if (key === "code") {
						arrow.textContent = sortVal === "code-asc" ? " ▲" : (sortVal === "code-desc" ? " ▼" : "");
					} else if (key === "grade") {
						arrow.textContent = sortVal === "grade-code" ? " ▲" : "";
					} else if (key === "name") {
						arrow.textContent = sortVal === "name-asc" ? " ▲" : "";
					} else {
						arrow.textContent = "";
					}
				});

				// Populate Grade Filter and Report Grade Select
				const gradeSet = new Set();
				for (const d of docs) {
					const g = d.grade || (d.values ? d.values[0] : "");
					if (g) gradeSet.add(g);
				}
				const gradeFilter = document.getElementById("grade-filter");
				const reportGradeSelect = document.getElementById("report-grade-select");
				const curGrade = gradeFilter.value;

				gradeFilter.innerHTML = '<option value="">គ្រប់ថ្នាក់</option>';
				reportGradeSelect.innerHTML = '<option value="">គ្រប់ថ្នាក់ទាំងអស់</option>';

				for (const g of Array.from(gradeSet).sort()) {
					const opt1 = document.createElement("option");
					opt1.value = g;
					opt1.textContent = "ថ្នាក់ " + g;
					if (g === curGrade) opt1.selected = true;
					gradeFilter.appendChild(opt1);

					const opt2 = document.createElement("option");
					opt2.value = g;
					opt2.textContent = "ថ្នាក់ " + g;
					reportGradeSelect.appendChild(opt2);
				}

				if (docs.length === 0) {
					const tr = document.createElement("tr");
					const td = document.createElement("td");
					td.colSpan = 74;
					td.style.padding = "2.5rem";
					td.style.textAlign = "center";
					td.style.color = "var(--text-muted)";
					td.textContent = "មិនមានទិន្នន័យសិស្សនៅឡើយទេ។ ចុច «➕» ដើម្បីបន្ថែម ឬ «📥» នាំចូល XLSX។";
					tr.appendChild(td);
					studentTbody.appendChild(tr);
					return;
				}

				let rowCounter = 1;
				for (const docItem of docs) {
					const tr = document.createElement("tr");
					tr.dataset.id = docItem.id;
					if (selectedStudentIds.has(docItem.id)) tr.classList.add("selected");

					// Col 1: Checkbox (Left frozen 1)
					const checkTd = document.createElement("td");
					checkTd.className = "sticky-col-checkbox";
					const box = document.createElement("input");
					box.type = "checkbox";
					box.className = "row-checkbox";
					box.checked = selectedStudentIds.has(docItem.id);
					box.onchange = (e) => {
						if (e.target.checked) selectedStudentIds.add(docItem.id);
						else selectedStudentIds.delete(docItem.id);
						tr.classList.toggle("selected", e.target.checked);
						updateBatchBar();
					};
					checkTd.appendChild(box);
					tr.appendChild(checkTd);

					// Col 2: Index (ល.រ - Left frozen 2)
					const indexTd = document.createElement("td");
					indexTd.className = "sticky-col-index";
					indexTd.textContent = rowCounter++;
					tr.appendChild(indexTd);

					// 71 Data Values (In-line Editable)
					// Frozen on left: i=0 (Grade), i=1 (Code), i=2 (LastName), i=3 (FirstName)
					// Horizontal scroll starts from: i=4 (Gender / ភេទ *)
					const vals = docItem.values || [];
					for (let i = 0; i < 71; i++) {
						const cell = document.createElement("td");
						cell.className = "editable-cell";
						const textVal = vals[i] ?? "";

						// Assign frozen left column classes for first 4 fields
						if (i === 0) {
							cell.classList.add("sticky-col-grade");
							cell.title = "ថ្នាក់ទី៖ " + textVal + " (ចុចដើម្បីកែប្រែ)";
							const wrap = document.createElement("div");
							wrap.className = "cell-kae-wrap";
							wrap.innerHTML = \`<span>\${textVal}</span><span class="cell-kae-indicator" title="កែប្រែថ្នាក់">✎</span>\`;
							cell.appendChild(wrap);
						} else if (i === 1) {
							cell.classList.add("sticky-col-code");
							cell.title = "អត្តលេខ៖ " + textVal + " (ចុចដើម្បីកែប្រែ)";
							const wrap = document.createElement("div");
							wrap.className = "cell-kae-wrap";
							wrap.innerHTML = \`<span>\${textVal}</span><span class="cell-kae-indicator" title="កែប្រែអត្តលេខ">✎</span>\`;
							cell.appendChild(wrap);
						} else if (i === 2) cell.classList.add("sticky-col-lastname");
						else if (i === 3) cell.classList.add("sticky-col-firstname");`;

if (html.includes(oldRenderTableStart)) {
	html = html.replace(oldRenderTableStart, newRenderTableStart);
	console.log('✓ Successfully updated renderTable with index col and quick kae wrappers');
} else {
	console.warn('⚠️ Could not find oldRenderTableStart');
}

// 7. Update cell click handler so clicking Grade or Code immediately triggers editing!
const oldCellClick = `						// Inline click/double click editor
						cell.addEventListener("click", () => {
							if (!inlineEditModeActive && !cell.dataset.active) return;
							startInlineEdit(cell, docItem.id, i, vals[i] ?? "");
						});
						cell.addEventListener("dblclick", () => {
							startInlineEdit(cell, docItem.id, i, vals[i] ?? "");
						});`;

const newCellClick = `						// Inline click/double click editor
						cell.addEventListener("click", (e) => {
							// For Grade (0) and Student Code (1), allow immediate edit on click or quick modal
							if (i === 0 || i === 1) {
								startInlineEdit(cell, docItem.id, i, vals[i] ?? "");
								return;
							}
							if (!inlineEditModeActive && !cell.dataset.active) return;
							startInlineEdit(cell, docItem.id, i, vals[i] ?? "");
						});
						cell.addEventListener("dblclick", () => {
							startInlineEdit(cell, docItem.id, i, vals[i] ?? "");
						});`;

if (html.includes(oldCellClick)) {
	html = html.replace(oldCellClick, newCellClick);
	console.log('✓ Successfully enhanced cell click for Grade & Code');
} else {
	console.warn('⚠️ Could not find oldCellClick');
}

// 8. Update filterTable to update index numbers
const oldFilterTable = `			// Filter Table Search & Grade
			function filterTable() {
				const query = document.getElementById("table-search").value.trim().toLocaleLowerCase();
				const selectedGrade = document.getElementById("grade-filter").value.trim();

				for (const row of studentTbody.rows) {
					if (!row.dataset.id) continue;
					const rowText = row.textContent.toLocaleLowerCase();
					const matchesQuery = !query || rowText.includes(query);
					const docItem = studentDocs.find(d => d.id === row.dataset.id);
					const itemGrade = docItem?.grade || (docItem?.values ? docItem.values[0] : "");
					const matchesGrade = !selectedGrade || itemGrade === selectedGrade;

					row.hidden = !(matchesQuery && matchesGrade);
				}
			}

			document.getElementById("table-search").addEventListener("input", filterTable);
			document.getElementById("grade-filter").addEventListener("change", filterTable);`;

const newFilterTable = `			// Filter Table Search & Grade
			function filterTable() {
				const query = document.getElementById("table-search").value.trim().toLocaleLowerCase();
				const selectedGrade = document.getElementById("grade-filter").value.trim();

				let visibleIdx = 1;
				for (const row of studentTbody.rows) {
					if (!row.dataset.id) continue;
					const rowText = row.textContent.toLocaleLowerCase();
					const matchesQuery = !query || rowText.includes(query);
					const docItem = studentDocs.find(d => d.id === row.dataset.id);
					const itemGrade = docItem?.grade || (docItem?.values ? docItem.values[0] : "");
					const matchesGrade = !selectedGrade || itemGrade === selectedGrade;

					const isVisible = matchesQuery && matchesGrade;
					row.hidden = !isVisible;
					if (isVisible) {
						const idxCell = row.querySelector(".sticky-col-index");
						if (idxCell) idxCell.textContent = visibleIdx++;
					}
				}
			}

			document.getElementById("table-search").addEventListener("input", filterTable);
			document.getElementById("grade-filter").addEventListener("change", filterTable);
			const sortSelectEl = document.getElementById("table-sort-select");
			if (sortSelectEl) {
				sortSelectEl.addEventListener("change", (e) => {
					currentSortMode = e.target.value;
					renderTable(studentDocs);
				});
			}`;

if (html.includes(oldFilterTable)) {
	html = html.replace(oldFilterTable, newFilterTable);
	console.log('✓ Successfully updated filterTable with dynamic visible index numbers');
} else {
	console.warn('⚠️ Could not find oldFilterTable');
}

// 9. Add Batch Renumbering JS and Quick Edit Modal JS
const oldBatchEnd = `				try {
					for (const id of selectedStudentIds) {
						await deleteDoc(doc(db, "students", id));
					}
					showToast(\`🗑️ បានលុបសិស្សចំនួន \${selectedStudentIds.size} នាក់រួចរាល់!\`);
					selectedStudentIds.clear();
					updateBatchBar();
				} catch (err) {
					handleFirestoreError(err, OperationType.DELETE, "students");
				}
			});`;

const newBatchEnd = `				try {
					for (const id of selectedStudentIds) {
						await deleteDoc(doc(db, "students", id));
					}
					showToast(\`🗑️ បានលុបសិស្សចំនួន \${selectedStudentIds.size} នាក់រួចរាល់!\`);
					selectedStudentIds.clear();
					updateBatchBar();
				} catch (err) {
					handleFirestoreError(err, OperationType.DELETE, "students");
				}
			});

			// Batch Auto-Renumber Student Codes (កែអត្តលេខរៀងជាបន្តបន្ទាប់)
			const batchRenumberBtn = document.getElementById("batch-renumber-btn");
			if (batchRenumberBtn) {
				batchRenumberBtn.addEventListener("click", async () => {
					if (selectedStudentIds.size === 0) return;
					const startCodeInput = document.getElementById("batch-start-code").value.trim();
					if (!startCodeInput) {
						showToast("⚠️ សូមបញ្ចូលលេខអត្តលេខចាប់ផ្ដើម (ឧ. 27001)", true);
						return;
					}
					if (!currentUser) {
						showToast("⚠️ សូមចុច «🔑» ចូលគណនី Google ជាមុនសិន ដើម្បីកែប្រែទិន្នន័យ!", true);
						return;
					}
					const match = startCodeInput.match(/^([a-zA-Z_\\-]*)([0-9]+)$/);
					if (!match) {
						showToast("⚠️ ទម្រង់អត្តលេខមិនត្រឹមត្រូវ (ឧ. 27001 ឬ S001)", true);
						return;
					}
					const prefix = match[1];
					const numStr = match[2];
					let currentNum = parseInt(numStr, 10);
					const padLength = numStr.length;

					if (!confirm(\`តើអ្នកពិតជាចង់រៀបចំកែអត្តលេខឡើងវិញសម្រាប់សិស្ស \${selectedStudentIds.size} នាក់ ចាប់ផ្ដើមពី \${startCodeInput} មែនទេ?\`)) return;

					const actor = currentUser?.displayName || currentUser?.email || "អ្នកប្រើប្រាស់";
					// Collect selected docs in current table display order
					const selectedDocsInOrder = [];
					for (const row of studentTbody.rows) {
						if (row.dataset.id && selectedStudentIds.has(row.dataset.id)) {
							const found = studentDocs.find(d => d.id === row.dataset.id);
							if (found) selectedDocsInOrder.push(found);
						}
					}

					let count = 0;
					try {
						for (const docItem of selectedDocsInOrder) {
							const newCode = prefix + String(currentNum).padStart(padLength, "0");
							currentNum++;
							const vals = [...(docItem.values || new Array(71).fill(""))];
							vals[1] = newCode;
							docItem.values = vals;
							docItem.studentCode = newCode;
							await updateDoc(doc(db, "students", docItem.id), {
								studentCode: newCode,
								values: vals,
								lastModifiedBy: actor,
								lastModifiedAt: serverTimestamp(),
								updatedAt: serverTimestamp(),
							});
							count++;
						}
						showToast(\`✓ បានរៀបចំកែអត្តលេខចំនួន \${count} នាក់រួចរាល់!\`);
						selectedStudentIds.clear();
						document.getElementById("batch-start-code").value = "";
						updateBatchBar();
						renderTable(studentDocs);
					} catch (err) {
						handleFirestoreError(err, OperationType.UPDATE, "students");
					}
				});
			}

			// Quick Edit Modal logic (កែប្រែ ថ្នាក់ទី & អត្តលេខ)
			const qeModal = document.getElementById("quick-edit-modal");
			const qeForm = document.getElementById("quick-edit-form");
			const qeStudentId = document.getElementById("qe-student-id");
			const qeStudentName = document.getElementById("qe-student-name");
			const qeGrade = document.getElementById("qe-grade");
			const qeCode = document.getElementById("qe-code");

			window.openQuickEditModal = function(docItem) {
				if (!docItem) return;
				qeStudentId.value = docItem.id;
				qeStudentName.textContent = \`\${docItem.lastName || docItem.values?.[2] || ""} \${docItem.firstName || docItem.values?.[3] || ""}\`;
				qeGrade.value = docItem.grade || docItem.values?.[0] || "";
				qeCode.value = docItem.studentCode || docItem.values?.[1] || "";
				qeModal.classList.remove("hidden");
				setTimeout(() => qeCode.focus(), 100);
			};

			document.getElementById("quick-edit-close")?.addEventListener("click", () => qeModal.classList.add("hidden"));
			document.getElementById("qe-cancel-btn")?.addEventListener("click", () => qeModal.classList.add("hidden"));

			qeForm?.addEventListener("submit", async (e) => {
				e.preventDefault();
				const docId = qeStudentId.value;
				const newGrade = qeGrade.value.trim();
				const newCode = qeCode.value.trim();
				if (!newGrade || !newCode) return;
				if (!currentUser) {
					showToast("⚠️ សូមចុច «🔑» ចូលគណនី Google ជាមុនសិន ដើម្បីកែប្រែទិន្នន័យ!", true);
					return;
				}
				const docItem = studentDocs.find(d => d.id === docId);
				if (!docItem) return;
				const vals = [...(docItem.values || new Array(71).fill(""))];
				vals[0] = newGrade;
				vals[1] = newCode;
				docItem.values = vals;
				docItem.grade = newGrade;
				docItem.studentCode = newCode;
				const actor = currentUser?.displayName || currentUser?.email || "អ្នកប្រើប្រាស់";
				try {
					await updateDoc(doc(db, "students", docId), {
						grade: newGrade,
						studentCode: newCode,
						values: vals,
						lastModifiedBy: actor,
						lastModifiedAt: serverTimestamp(),
						updatedAt: serverTimestamp(),
					});
					showToast(\`💾 បានកែប្រែ ថ្នាក់ \${newGrade} និងអត្តលេខ \${newCode} រួចរាល់!\`);
					qeModal.classList.add("hidden");
					renderTable(studentDocs);
				} catch (err) {
					handleFirestoreError(err, OperationType.UPDATE, \`students/\${docId}\`);
				}
			});`;

if (html.includes(oldBatchEnd)) {
	html = html.replace(oldBatchEnd, newBatchEnd);
	console.log('✓ Successfully added batch renumbering and quick edit modal listeners');
} else {
	console.warn('⚠️ Could not find oldBatchEnd');
}

// 10. Update row action buttons: add Quick Edit button
const oldActionButtons = `					const editBtn = document.createElement("button");
					editBtn.className = "btn-icon";
					editBtn.title = "កែប្រែ";
					editBtn.textContent = "✏️";
					editBtn.onclick = () => openEditModal(docItem);`;

const newActionButtons = `					const qeBtn = document.createElement("button");
					qeBtn.className = "btn-icon";
					qeBtn.style.color = "#1e40af";
					qeBtn.title = "កែប្រែ ថ្នាក់ទី & អត្តលេខ (Quick Edit Grade & Code)";
					qeBtn.textContent = "🏷️";
					qeBtn.onclick = () => window.openQuickEditModal(docItem);

					const editBtn = document.createElement("button");
					editBtn.className = "btn-icon";
					editBtn.title = "កែប្រែព័ត៌មានពេញលេញ (Full Edit)";
					editBtn.textContent = "✏️";
					editBtn.onclick = () => openEditModal(docItem);`;

if (html.includes(oldActionButtons)) {
	html = html.replace(oldActionButtons, newActionButtons);
	console.log('✓ Successfully added quick edit button to action column');
} else {
	console.warn('⚠️ Could not find oldActionButtons');
}

// Write back updated index.html
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('🎉 Successfully applied all enhancements to index.html!');
