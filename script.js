let currentLayer = 0;
const layers = document.querySelectorAll(".layer");
const totalLayers = layers.length;
let isScrolling = false;
const scrollIndicator = document.querySelector(".scroll-down");

// 初始化时检查 "Scroll Down" 是否需要显示
updateScrollIndicator();

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0 && currentLayer < totalLayers - 1) {
        currentLayer++;
    } else if (event.deltaY < 0 && currentLayer > 0) {
        currentLayer--;
    }

    document.getElementById("main-container").style.transform = `translateY(-${currentLayer * 100}vh)`;

    updateScrollIndicator();

    setTimeout(() => {
        isScrolling = false;
    }, 900);
});

// 更新 "Scroll Down" 指示器的可见性
function updateScrollIndicator() {
    if (currentLayer === totalLayers - 1) {
        scrollIndicator.style.display = "none";
    } else {
        scrollIndicator.style.display = "block";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("skill-tree")) {
        adjustSkillTreeSize();
        generateSkillTree();
        window.addEventListener("resize", adjustSkillTreeSize); // 监听窗口缩放
    }
});

function adjustSkillTreeSize() {
    const svg = document.getElementById("skill-tree");
    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", window.innerHeight);
    generateSkillTree(); // 重新生成技能树，确保内容适配
}

function generateSkillTree() {
    const skills = [
        { name: "Programming", children: ["Python", "Java", "C++", "C", "R", "C#"] },
        { name: "Machine Learning", children: ["Deep Learning", "Transformer", "Computer Vision"] },
        { name: "Web Development", children: ["HTML", "CSS", "JavaScript", "React"] },
        { name: "Data Science", children: ["Pandas", "NumPy", "Matplotlib"] },
        { name: "Tools & OS", children: ["Git", "Linux", "Unix"] }
    ];

    const svg = document.getElementById("skill-tree");
    svg.innerHTML = ""; // 清空旧内容
    const width = window.innerWidth;
    const height = window.innerHeight;
    const baseWidth = 1200; // 设计时的基础宽度
    const baseHeight = 800; // 设计时的基础高度

    // 计算缩放比例 (先放大 30%，再根据窗口调整)
    const scale = Math.min(1.3, width / baseWidth, height / baseHeight); // 原始大小 × 1.3

    // 调整中心点 (向上移动 100px)
    const centerX = width / 2;
    const centerY = height / 2 - 100 * scale;

    // 创建根节点 (始终保持在窗口中心)
    const root = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    root.setAttribute("cx", centerX);
    root.setAttribute("cy", centerY);
    root.setAttribute("r", 30 * scale);
    root.setAttribute("fill", "#f5a623");
    svg.appendChild(root);

    // 创建文本
    const rootText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    rootText.setAttribute("x", centerX);
    rootText.setAttribute("y", centerY + 6);
    rootText.setAttribute("text-anchor", "middle");
    rootText.setAttribute("fill", "white");
    rootText.setAttribute("font-size", `${18 * scale}px`);
    rootText.setAttribute("font-weight", "bold");
    rootText.textContent = "Skills";
    svg.appendChild(rootText);

    let angleStep = (2 * Math.PI) / skills.length;
    let radius = 180 * scale;

    skills.forEach((skill, index) => {
        let angle = angleStep * index;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        // 先创建连接线 (放在最底层)
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#ffffff");
        line.setAttribute("stroke-width", 2 * scale);
        line.setAttribute("opacity", "0.7");
        svg.insertBefore(line, root);

        // 创建分支圆圈
        let node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        node.setAttribute("cx", x);
        node.setAttribute("cy", y);
        node.setAttribute("r", 22 * scale);
        node.setAttribute("fill", "#6fcf97");
        svg.appendChild(node);

        // 添加文本
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 6);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", `${14 * scale}px`);
        text.setAttribute("font-weight", "bold");
        text.textContent = skill.name;
        svg.appendChild(text);

        // 添加子技能
        let subAngleStep = (Math.PI / skill.children.length);
        let subRadius = 120 * scale;

        skill.children.forEach((subSkill, subIndex) => {
            let subAngle = angle - (subAngleStep * (skill.children.length - 1) / 2) + subAngleStep * subIndex;
            let subX = x + subRadius * Math.cos(subAngle);
            let subY = y + subRadius * Math.sin(subAngle);

            // 先创建子技能的连接线 (放在底层)
            let subLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            subLine.setAttribute("x1", x);
            subLine.setAttribute("y1", y);
            subLine.setAttribute("x2", subX);
            subLine.setAttribute("y2", subY);
            subLine.setAttribute("stroke", "#ffffff");
            subLine.setAttribute("stroke-width", 1.5 * scale);
            subLine.setAttribute("opacity", "0.7");
            svg.insertBefore(subLine, node);

            // 创建子技能圆圈
            let subNode = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            subNode.setAttribute("cx", subX);
            subNode.setAttribute("cy", subY);
            subNode.setAttribute("r", 16 * scale);
            subNode.setAttribute("fill", "#2d9cdb");
            svg.appendChild(subNode);

            // 添加文本
            let subText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            subText.setAttribute("x", subX);
            subText.setAttribute("y", subY + 6);
            subText.setAttribute("text-anchor", "middle");
            subText.setAttribute("fill", "white");
            subText.setAttribute("font-size", `${12 * scale}px`);
            subText.setAttribute("font-weight", "bold");
            subText.textContent = subSkill;
            svg.appendChild(subText);
        });
    });
}
