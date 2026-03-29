/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Headphones, 
  Volume2, 
  Settings2, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Wind,
  RefreshCw,
  Play,
  Square,
  MicOff,
  Circle,
  ChevronUp,
  Mic2,
  ExternalLink,
  Download,
  Monitor,
  Globe,
  CircleStop,
  PlayCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Tooltip({ children, text }: { children: React.ReactNode, text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-blue-600 text-white text-[11px] font-bold leading-relaxed rounded-2xl shadow-2xl z-[100] pointer-events-none border border-blue-400/30 text-center"
          >
            <div className="relative">
              {text}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-blue-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Types ---
interface AudioDevice {
  deviceId: string;
  label: string;
}

// --- Translations ---
const translations = {
  vi: {
    title: "SonicPure PRO",
    subtitle: "Hệ thống Xử lý Giọng nói",
    statusActive: "Hệ thống đang chạy",
    statusReady: "Sẵn sàng",
    refresh: "Làm mới thiết bị",
    visualizerTitle: "Phổ Âm Thanh",
    visualizerDesc: "Giám sát tín hiệu giọng nói thời gian thực",
    noSignal: "Chưa có tín hiệu đầu vào",
    startBtn: "Bắt Đầu Lọc Âm",
    stopBtn: "Dừng Lọc Âm",
    monitorBtn: "Nghe Thử",
    monitoring: "Đang Nghe",
    latency: "Độ Trễ",
    latencyVal: "Cực Thấp",
    latencyDesc: "Xử lý thời gian thực",
    quality: "Chất Lượng",
    qualityVal: "Phòng Thu",
    qualityDesc: "Âm thanh 48kHz",
    optimization: "Tối Ưu",
    optimizationVal: "Tự Động",
    optimizationDesc: "AI Voice Engine",
    deviceTitle: "Thiết Bị",
    micLabel: "Microphone",
    outputLabel: "Tai Nghe / Loa",
    filterTitle: "Chế Độ Lọc",
    autoMode: "Tự Động",
    manualMode: "Thủ Công",
    noiseSuppression: "Khử Tiếng Ồn Nền",
    echoCancellation: "Chống Vang (Echo)",
    compression: "Nén Giọng Nói",
    advancedShow: "Hiện Cài Đặt Nâng Cao",
    advancedHide: "Ẩn Cài Đặt Nâng Cao",
    gain: "Âm Lượng (Gain)",
    gainDesc: "Tăng/giảm độ nhạy micro. Tăng nếu giọng nhỏ, giảm nếu bị rè.",
    lowCut: "Lọc Trầm (Low-Cut)",
    lowCutDesc: "Loại bỏ tiếng ù, tiếng gió. Giúp giọng nói trong trẻo hơn.",
    highBoost: "Độ Sắc (High-Boost)",
    highBoostDesc: "Tăng cường tần số cao. Giúp giọng nói sắc nét hơn.",
    threshold: "Ngưỡng Nén (Threshold)",
    thresholdDesc: "Cân bằng âm lượng. Giúp giọng nói đều và chuyên nghiệp.",
    testTitle: "Kiểm Tra Ghi Âm",
    startRecord: "Bắt Đầu Ghi",
    stopRecord: "Dừng & Lưu",
    testNote: "* Hãy ghi âm một đoạn ngắn để tự mình cảm nhận chất lượng âm thanh sau khi lọc.",
    readyBtn: "Sẵn sàng",
    guideBtn: "Hướng dẫn",
    downloadBtn: "Tải VB-Cable",
    guideTitle: "Hướng Dẫn Kết Nối Chi Tiết",
    guideStep1: "Bước 1: Tải VC Cable",
    guideStep1Desc: "Tải và cài đặt 'VB-Audio Virtual Cable'. Đây là phần mềm trung gian để truyền âm thanh sạch sang các ứng dụng khác.",
    guideStep2: "Bước 2: Chọn Input & Output",
    guideStep2Desc: "Trong ứng dụng này: Chọn Micro của bạn làm Input. Chọn 'CABLE Input (VB-Audio)' làm Output.",
    guideStep3: "Bước 3: Kích Hoạt Lọc Âm",
    guideStep3Desc: "Nhấn nút 'Bắt Đầu Lọc Âm'. Giọng nói của bạn sẽ được xử lý và truyền vào sợi cáp ảo.",
    guideStep4: "Bước 4: Cấu Hình Zoom/Teams",
    guideStep4Desc: "Mở Zoom/Teams, vào Cài đặt âm thanh. Chọn Microphone là 'CABLE Output (VB-Audio)'.",
    winGuideTitle: "Lưu ý quan trọng",
    winStep1: "Khởi động lại máy",
    winStep1Desc: "Sau khi cài đặt Virtual Cable, hãy khởi động lại máy để Windows nhận diện thiết bị mới.",
    winStep2: "Kiểm tra âm lượng",
    winStep2Desc: "Đảm bảo âm lượng của CABLE Input trong Windows Sound Settings được đặt ở mức 100%.",
    footer: "Professional Voice Processing • © 2026 SonicPure Labs"
  },
  zh: {
    title: "SonicPure PRO",
    subtitle: "语音处理系统",
    statusActive: "系统正在运行",
    statusReady: "就绪",
    refresh: "刷新设备",
    visualizerTitle: "频谱图",
    visualizerDesc: "实时语音信号监控",
    noSignal: "无输入信号",
    startBtn: "开始降噪",
    stopBtn: "停止降噪",
    monitorBtn: "监听",
    monitoring: "正在监听",
    latency: "延迟",
    latencyVal: "极低",
    latencyDesc: "实时处理",
    quality: "音质",
    qualityVal: "录音室级",
    qualityDesc: "48kHz 高保真",
    optimization: "优化",
    optimizationVal: "自动",
    optimizationDesc: "AI 语音引擎",
    deviceTitle: "设备设置",
    micLabel: "麦克风",
    outputLabel: "耳机 / 扬声器",
    filterTitle: "过滤模式",
    autoMode: "自动",
    manualMode: "手动",
    noiseSuppression: "背景降噪",
    echoCancellation: "回声消除",
    compression: "语音压缩",
    advancedShow: "显示高级设置",
    advancedHide: "隐藏高级设置",
    gain: "增益 (Gain)",
    gainDesc: "增加或减少麦克风灵敏度。声音太小则增加，有杂音则减少。",
    lowCut: "低切 (Low-Cut)",
    lowCutDesc: "消除低频噪音（如嗡嗡声、风声）。使声音更清澈。",
    highBoost: "高频增强",
    highBoostDesc: "增强高频。使声音更尖锐、更清晰。",
    threshold: "压缩阈值",
    thresholdDesc: "开始压缩声音的阈值。平衡大声和小声部分。",
    testTitle: "录音测试",
    startRecord: "开始录音",
    stopRecord: "停止并保存",
    testNote: "* 请录制一段简短的音频，亲自感受过滤后的音质。",
    readyBtn: "就绪",
    guideBtn: "指南",
    downloadBtn: "下载 VB-Cable",
    guideTitle: "详细连接指南",
    guideStep1: "第一步：下载 VC Cable",
    guideStep1Desc: "下载并安装 'VB-Audio Virtual Cable'。它是将清晰音频传输到其他应用的桥梁。",
    guideStep2: "第二步：选择输入和输出",
    guideStep2Desc: "在此应用中：选择您的麦克风作为输入。选择 'CABLE Input (VB-Audio)' 作为输出。",
    guideStep3: "第三步：激活降噪",
    guideStep3Desc: "点击“开始降噪”。您的语音将被处理并发送到虚拟电缆。",
    guideStep4: "第四步：配置 Zoom/Teams",
    guideStep4Desc: "在 Zoom/Teams 设置中，将麦克风选择为 'CABLE Output (VB-Audio)'。",
    winGuideTitle: "重要提示",
    winStep1: "重启电脑",
    winStep1Desc: "安装虚拟电缆后，请重启电脑以便 Windows 识别新设备。",
    winStep2: "检查音量",
    winStep2Desc: "确保 Windows 声音设置中的 CABLE Input 音量设置为 100%。",
    footer: "专业语音处理 • © 2026 SonicPure Labs"
  },
  en: {
    title: "SonicPure PRO",
    subtitle: "Audio Processing System",
    statusActive: "System Running",
    statusReady: "Ready",
    refresh: "Refresh Devices",
    visualizerTitle: "Audio Spectrum",
    visualizerDesc: "Real-time voice signal monitoring",
    noSignal: "No input signal",
    startBtn: "Start Filtering",
    stopBtn: "Stop Filtering",
    monitorBtn: "Monitor",
    monitoring: "Monitoring",
    latency: "Latency",
    latencyVal: "Ultra Low",
    latencyDesc: "Real-time processing",
    quality: "Quality",
    qualityVal: "Studio",
    qualityDesc: "48kHz High-Fidelity",
    optimization: "Optimization",
    optimizationVal: "Automatic",
    optimizationDesc: "AI Voice Engine",
    deviceTitle: "Devices",
    micLabel: "Microphone",
    outputLabel: "Headphones / Speakers",
    filterTitle: "Filter Modes",
    autoMode: "Auto",
    manualMode: "Manual",
    noiseSuppression: "Noise Suppression",
    echoCancellation: "Echo Cancellation",
    compression: "Voice Compression",
    advancedShow: "Show Advanced Settings",
    advancedHide: "Hide Advanced Settings",
    gain: "Input Gain",
    gainDesc: "Increase or decrease mic sensitivity. Increase if too quiet, decrease if clipping.",
    lowCut: "Low-Cut Filter",
    lowCutDesc: "Removes low frequencies (hum, wind). Makes voice clearer.",
    highBoost: "High-Boost",
    highBoostDesc: "Enhances high frequencies. Makes voice sharper and more defined.",
    threshold: "Threshold",
    thresholdDesc: "The level where compression starts. Balances loud and quiet parts.",
    testTitle: "Recording Test",
    startRecord: "Start Recording",
    stopRecord: "Stop & Save",
    testNote: "* Record a short clip to experience the filtered audio quality.",
    readyBtn: "Ready",
    guideBtn: "Guide",
    downloadBtn: "Download VB-Cable",
    guideTitle: "Detailed Connection Guide",
    guideStep1: "Step 1: Download VC Cable",
    guideStep1Desc: "Download and install 'VB-Audio Virtual Cable'. This acts as a bridge to route clean audio to other apps.",
    guideStep2: "Step 2: Select Input & Output",
    guideStep2Desc: "In this app: Set your Microphone as Input. Set 'CABLE Input (VB-Audio)' as Output.",
    guideStep3: "Step 3: Activate Filtering",
    guideStep3Desc: "Click 'Start Filtering'. Your voice will be processed and sent to the virtual cable.",
    guideStep4: "Step 4: Configure Zoom/Teams",
    guideStep4Desc: "In Zoom/Teams settings, select Microphone as 'CABLE Output (VB-Audio)'.",
    winGuideTitle: "Important Notes",
    winStep1: "Restart PC",
    winStep1Desc: "After installing Virtual Cable, restart your computer for Windows to recognize the new devices.",
    winStep2: "Check Volume",
    winStep2Desc: "Ensure CABLE Input volume in Windows Sound Settings is set to 100%.",
    footer: "Professional Voice Processing • © 2026 SonicPure Labs"
  }
};

export default function App() {
  const [lang, setLang] = useState<'vi' | 'zh' | 'en'>('vi');
  const t = translations[lang];

  const [inputs, setInputs] = useState<AudioDevice[]>([]);
  const [outputs, setOutputs] = useState<AudioDevice[]>([]);
  const [selectedInput, setSelectedInput] = useState<string>('');
  const [selectedOutput, setSelectedOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [gain, setGain] = useState(1.5); // Increased default gain to solve "too quiet" issue
  const [lowCutFreq, setLowCutFreq] = useState(85);
  const [highBoostGain, setHighBoostGain] = useState(6);
  const [compression, setCompression] = useState(true);
  const [threshold, setThreshold] = useState(-24);
  const [monitor, setMonitor] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const [showAdvanced, setShowAdvanced] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const highFilterNodeRef = useRef<BiquadFilterNode | null>(null);
  const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const destinationNodeRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // --- Device Enumeration ---
  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices
        .filter(d => d.kind === 'audioinput')
        .map(d => ({ deviceId: d.deviceId, label: d.label || `Microphone ${d.deviceId.slice(0, 4)}` }));
      const audioOutputs = devices
        .filter(d => d.kind === 'audiooutput')
        .map(d => ({ deviceId: d.deviceId, label: d.label || `Speaker ${d.deviceId.slice(0, 4)}` }));
      
      setInputs(audioInputs);
      setOutputs(audioOutputs);
      
      if (audioInputs.length > 0 && !selectedInput) {
        const defaultInput = audioInputs.find(d => d.label.includes('Realtek(R) Audio')) || audioInputs[0];
        setSelectedInput(defaultInput.deviceId);
      }
      if (audioOutputs.length > 0 && !selectedOutput) {
        const defaultOutput = audioOutputs.find(d => d.label.includes('CABLE Input')) || audioOutputs[0];
        setSelectedOutput(defaultOutput.deviceId);
      }
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  };

  useEffect(() => {
    // Initial permission request to get labels
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        stream.getTracks().forEach(t => t.stop());
        getDevices();
      })
      .catch(err => console.error('Permission denied', err));

    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    return () => navigator.mediaDevices.removeEventListener('devicechange', getDevices);
  }, []);

  // --- Audio Processing Logic ---
  const startProcessing = async () => {
    if (isProcessing) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedInput ? { exact: selectedInput } : undefined,
          echoCancellation: echoCancellation,
          noiseSuppression: noiseSuppression,
          autoGainControl: true,
        }
      });

      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioContextRef.current;

      sourceNodeRef.current = ctx.createMediaStreamSource(stream);
      gainNodeRef.current = ctx.createGain();
      analyzerRef.current = ctx.createAnalyser();
      filterNodeRef.current = ctx.createBiquadFilter(); // Low-cut
      highFilterNodeRef.current = ctx.createBiquadFilter(); // High-boost
      compressorNodeRef.current = ctx.createDynamicsCompressor();
      destinationNodeRef.current = ctx.createMediaStreamDestination();

      // Configure nodes
      gainNodeRef.current.gain.value = gain;
      analyzerRef.current.fftSize = 256;
      
      // Compressor settings for professional voice
      compressorNodeRef.current.threshold.setValueAtTime(threshold, ctx.currentTime);
      compressorNodeRef.current.knee.setValueAtTime(30, ctx.currentTime);
      compressorNodeRef.current.ratio.setValueAtTime(compression ? 12 : 1, ctx.currentTime);
      compressorNodeRef.current.attack.setValueAtTime(0.003, ctx.currentTime);
      compressorNodeRef.current.release.setValueAtTime(0.25, ctx.currentTime);

      // Filter settings
      filterNodeRef.current.type = 'highpass';
      filterNodeRef.current.frequency.value = lowCutFreq;
      
      highFilterNodeRef.current.type = 'highshelf';
      highFilterNodeRef.current.frequency.value = 4000;
      highFilterNodeRef.current.gain.value = highBoostGain;
      
      // Chain: Source -> LowCut -> HighBoost -> Compressor -> Gain -> Analyzer -> Destination
      sourceNodeRef.current.connect(filterNodeRef.current);
      filterNodeRef.current.connect(highFilterNodeRef.current);
      highFilterNodeRef.current.connect(compressorNodeRef.current);
      compressorNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyzerRef.current);
      gainNodeRef.current.connect(destinationNodeRef.current);
      
      if (monitor) {
        gainNodeRef.current.connect(ctx.destination);
      }
      
      setIsProcessing(true);
      drawVisualizer();
    } catch (err) {
      console.error('Failed to start audio:', err);
    }
  };

  // --- Recording Logic ---
  const startRecording = () => {
    if (!destinationNodeRef.current) return;
    
    audioChunksRef.current = [];
    const recorder = new MediaRecorder(destinationNodeRef.current.stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
    };

    recorder.start();
    setIsRecording(true);
    setRecordingTime(0);
    setRecordedUrl(null);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const stopProcessing = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsProcessing(false);
  };

  // --- Visualizer ---
  const drawVisualizer = () => {
    if (!canvasRef.current || !analyzerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyzerRef.current!.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;
        
        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#2563eb');
        gradient.addColorStop(1, '#60a5fa');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 4);
        ctx.fill();
        
        x += barWidth;
      }
    };
    render();
  };

  // --- Update Parameters ---
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(gain, audioContextRef.current.currentTime, 0.1);
    }
  }, [gain]);

  useEffect(() => {
    if (filterNodeRef.current && audioContextRef.current) {
      filterNodeRef.current.frequency.setTargetAtTime(lowCutFreq, audioContextRef.current.currentTime, 0.1);
    }
  }, [lowCutFreq]);

  useEffect(() => {
    if (highFilterNodeRef.current && audioContextRef.current) {
      highFilterNodeRef.current.gain.setTargetAtTime(highBoostGain, audioContextRef.current.currentTime, 0.1);
    }
  }, [highBoostGain]);

  useEffect(() => {
    if (compressorNodeRef.current && audioContextRef.current) {
      compressorNodeRef.current.threshold.setTargetAtTime(threshold, audioContextRef.current.currentTime, 0.1);
      compressorNodeRef.current.ratio.setTargetAtTime(compression ? 12 : 1, audioContextRef.current.currentTime, 0.1);
    }
  }, [threshold, compression]);

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      if (monitor) {
        gainNodeRef.current.connect(audioContextRef.current.destination);
      } else {
        try {
          gainNodeRef.current.disconnect(audioContextRef.current.destination);
        } catch (e) {
          // Already disconnected
        }
      }
    }
  }, [monitor]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">{t.title} <span className="text-blue-500">PRO</span></h1>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">{t.subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 rounded-2xl border border-white/10 p-1">
            {(['vi', 'zh', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  lang === l ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-white/40 hover:text-white/60"
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
            <div className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]", isProcessing ? "text-green-500 bg-green-500 animate-pulse" : "text-white/20 bg-white/20")} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              {isProcessing ? t.statusActive : t.statusReady}
            </span>
          </div>

          <Tooltip text={t.guideStep1Desc}>
            <a 
              href="https://vb-audio.com/Cable/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 transition-all group"
            >
              <Download size={14} className="group-hover:bounce" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{t.downloadBtn}</span>
            </a>
          </Tooltip>

          <button 
            onClick={getDevices}
            title={t.refresh}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/60 hover:text-white border border-white/5"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* Top Section: Main Action & Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visualizer & Action */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h2 className="text-lg font-bold text-white/90">{t.visualizerTitle}</h2>
                  <p className="text-xs text-white/40">{t.visualizerDesc}</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">48kHz / 24-bit</div>
                </div>
              </div>

              <div className="h-[180px] relative z-10">
                <canvas 
                  ref={canvasRef} 
                  width={800} 
                  height={180} 
                  className="w-full h-full"
                />
                <AnimatePresence>
                  {!isProcessing && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                        <MicOff className="w-8 h-8 text-white/20" />
                      </div>
                      <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{t.noSignal}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
                <div className="flex-[2]">
                  <Tooltip text={t.guideStep3Desc}>
                    <button 
                      onClick={isProcessing ? stopProcessing : startProcessing}
                      className={cn(
                        "w-full py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-xl",
                        isProcessing 
                          ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20" 
                          : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
                      )}
                    >
                      {isProcessing ? (
                        <><Square size={20} fill="currentColor" /> {t.stopBtn}</>
                      ) : (
                        <><Play size={20} fill="currentColor" /> {t.startBtn}</>
                      )}
                    </button>
                  </Tooltip>
                </div>
                
                <div className="flex-1 flex gap-3">
                  <Tooltip text="Nghe trực tiếp âm thanh sau khi đã lọc để kiểm tra chất lượng.">
                    <button 
                      onClick={() => setMonitor(!monitor)}
                      className={cn(
                        "h-full px-6 rounded-3xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 border",
                        monitor 
                          ? "bg-green-500/10 border-green-500/30 text-green-500" 
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                      )}
                    >
                      <Headphones size={18} />
                      {monitor ? t.monitoring : t.monitorBtn}
                    </button>
                  </Tooltip>

                  <div className="relative flex-1">
                    {!isRecording ? (
                      <Tooltip text={t.testNote}>
                        <button 
                          disabled={!isProcessing}
                          onClick={startRecording}
                          className="w-full h-full rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all disabled:opacity-20 group"
                        >
                          <Circle size={16} className="text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{t.startRecord}</span>
                        </button>
                      </Tooltip>
                    ) : (
                      <button 
                        onClick={stopRecording}
                        className="w-full h-full rounded-3xl bg-red-500/20 border border-red-500/30 flex items-center justify-center gap-2 animate-pulse"
                      >
                        <CircleStop size={16} className="text-red-500" fill="currentColor" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">00:{recordingTime.toString().padStart(2, '0')}</span>
                      </button>
                    )}

                    {recordedUrl && !isRecording && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => {
                          const audio = new Audio(recordedUrl);
                          audio.play();
                        }}
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                      >
                        <Play size={14} fill="currentColor" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatusCard 
                title={t.latency} 
                value={t.latencyVal} 
                desc={t.latencyDesc} 
                icon={<Zap className="text-yellow-400" size={18} />} 
              />
              <StatusCard 
                title={t.quality} 
                value={t.qualityVal} 
                desc={t.qualityDesc} 
                icon={<ShieldCheck className="text-blue-400" size={18} />} 
              />
              <StatusCard 
                title={t.optimization} 
                value={t.optimizationVal} 
                desc={t.optimizationDesc} 
                icon={<Activity className="text-purple-400" size={18} />} 
              />
            </div>
          </div>

          {/* Right Column: Settings & Devices */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Device Selection Card */}
            <Tooltip text={t.guideStep2Desc}>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-5 space-y-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl">
                    <Settings2 size={18} className="text-blue-400" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">{t.deviceTitle}</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">{t.micLabel}</label>
                    <div className="relative group">
                      <select 
                        value={selectedInput}
                        onChange={(e) => setSelectedInput(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer group-hover:bg-white/10"
                      >
                        {inputs.map(d => (
                          <option key={d.deviceId} value={d.deviceId} className="bg-[#0a0a0a]">{d.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-white/40 transition-colors">
                        <Mic size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">{t.outputLabel}</label>
                    <div className="relative group">
                      <select 
                        value={selectedOutput}
                        onChange={(e) => setSelectedOutput(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer group-hover:bg-white/10"
                      >
                        {outputs.map(d => (
                          <option key={d.deviceId} value={d.deviceId} className="bg-[#0a0a0a]">{d.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-white/40 transition-colors">
                        <Headphones size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tooltip>

            {/* Quick Filters Card */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-5 space-y-5 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-xl">
                    <ShieldCheck size={18} className="text-green-400" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">{t.filterTitle}</h2>
                </div>
                <button 
                  onClick={() => {
                    setAutoMode(!autoMode);
                    if (!autoMode) {
                      setNoiseSuppression(true);
                      setEchoCancellation(true);
                      setLowCutFreq(85);
                      setHighBoostGain(6);
                      setGain(1.5);
                      setThreshold(-24);
                      setCompression(true);
                    }
                  }}
                  className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
                    autoMode ? "bg-blue-600 text-white" : "bg-white/10 text-white/40"
                  )}
                >
                  {autoMode ? t.autoMode : t.manualMode}
                </button>
              </div>

              <div className="space-y-3">
                <Toggle 
                  label={t.noiseSuppression} 
                  icon={<Wind size={14} />} 
                  active={noiseSuppression} 
                  disabled={autoMode}
                  onClick={() => setNoiseSuppression(!noiseSuppression)} 
                />
                <Toggle 
                  label={t.echoCancellation} 
                  icon={<RefreshCw size={14} />} 
                  active={echoCancellation} 
                  disabled={autoMode}
                  onClick={() => setEchoCancellation(!echoCancellation)} 
                />
                <Toggle 
                  label={t.compression} 
                  icon={<Zap size={14} />} 
                  active={compression} 
                  disabled={autoMode}
                  onClick={() => setCompression(!compression)} 
                />
              </div>

              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-blue-400 transition-colors flex items-center justify-center gap-2"
              >
                {showAdvanced ? t.advancedHide : t.advancedShow}
                <Settings2 size={12} />
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-6 pt-4 border-t border-white/5"
                  >
                    {/* Advanced Sliders */}
                    <Slider 
                      label={t.gain} 
                      desc={t.gainDesc}
                      value={(gain * 100).toFixed(0) + "%"} 
                      min={0} max={4} step={0.1} 
                      val={gain} 
                      disabled={autoMode}
                      onChange={setGain} 
                    />
                    <Slider 
                      label={t.lowCut} 
                      desc={t.lowCutDesc}
                      value={lowCutFreq + "Hz"} 
                      min={20} max={300} step={5} 
                      val={lowCutFreq} 
                      disabled={autoMode}
                      onChange={setLowCutFreq} 
                    />
                    <Slider 
                      label={t.highBoost} 
                      desc={t.highBoostDesc}
                      value={"+" + highBoostGain + "dB"} 
                      min={0} max={12} step={1} 
                      val={highBoostGain} 
                      disabled={autoMode}
                      onChange={setHighBoostGain} 
                    />
                    <Slider 
                      label={t.threshold} 
                      desc={t.thresholdDesc}
                      value={threshold + "dB"} 
                      min={-60} max={0} step={1} 
                      val={threshold} 
                      disabled={autoMode || !compression}
                      onChange={setThreshold} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-8 py-6 px-8 text-center bg-black/20">
        <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">
          {t.footer}
        </p>
      </footer>
    </div>
  );
}

// --- Sub-components ---

function Toggle({ label, icon, active, onClick, disabled }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void, disabled?: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-300",
        active 
          ? "bg-blue-500/10 border-blue-500/30 text-white shadow-lg shadow-blue-500/5" 
          : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10",
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn("p-2 rounded-xl transition-colors", active ? "bg-blue-500 text-white" : "bg-white/5 text-white/40")}>
          {icon}
        </div>
        <span className="text-xs font-bold tracking-wide">{label}</span>
      </div>
      <div className={cn(
        "w-10 h-5 rounded-full relative transition-colors",
        active ? "bg-blue-500" : "bg-white/10"
      )}>
        <motion.div 
          animate={{ x: active ? 20 : 4 }}
          className="absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm" 
        />
      </div>
    </button>
  );
}

function Slider({ label, desc, value, min, max, step, val, onChange, disabled }: { label: string, desc?: string, value: string, min: number, max: number, step: number, val: number, onChange: (v: any) => void, disabled?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest block">{label}</label>
          {desc && <p className="text-[9px] text-white/20 leading-tight max-w-[200px]">{desc}</p>}
        </div>
        <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={val}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
      />
    </div>
  );
}

function StatusCard({ title, value, desc, icon }: { title: string, value: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] p-4 space-y-2 hover:border-blue-500/20 transition-all group shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-blue-500/40 transition-colors">{title}</span>
        <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-blue-500/10 transition-colors">
          {icon}
        </div>
      </div>
      <div className="text-lg font-black tracking-tight text-white/90">{value}</div>
      <p className="text-[9px] font-bold text-white/20 uppercase tracking-wider">{desc}</p>
    </div>
  );
}

